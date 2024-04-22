import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import { StatusType } from '@prisma/client';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get post',
    method: 'GET',
    requestUrl: '/api/post/[postId]/comments/[parentId]',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string; parentId: string } }
) => {
    const { slug: postId, parentId } = params;

    const pageMeta = {
        totalPages: 0,
        page: 0,
        totalElements: 0,
        pageSize: 5,
        hasNext: false,
        hasPrev: false,
    } as PageMeta;

    const page = request.nextUrl.searchParams.get('page');
    const pageSize = request.nextUrl.searchParams.get('pageSize');

    try {
        const parsedPage = parseInt(page || '');
        if (parsedPage < 1) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: {
                        error: 'Search param page must be greater than 0',
                    },
                },
                { status: 400 }
            );
        }
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Search param page must be number' },
            },
            { status: 400 }
        );
    }
    try {
        const parsedPageSize = parseInt(pageSize || '');
        if (parsedPageSize < 1 || parsedPageSize >= 10) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: {
                        error: 'Search param pageSize must be greater than 0 and smaller than 10',
                    },
                },
                { status: 400 }
            );
        }
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Search param pageSize must be number' },
            },
            { status: 400 }
        );
    }

    pageMeta.totalElements = await prisma.postComment.count({
        where: {
            postId: postId,
            parentId: parentId || '',
        },
    });
    pageMeta.pageSize = pageSize ? parseInt(pageSize) : pageMeta.pageSize;
    pageMeta.totalPages = Math.ceil(pageMeta.totalElements / pageMeta.pageSize);
    pageMeta.page = parseInt(page || '1');
    pageMeta.hasNext = pageMeta.page < pageMeta.totalPages;
    pageMeta.hasPrev = pageMeta.page > 1;

    const skip = (pageMeta.page - 1) * pageMeta.pageSize;

    try {
        const comments = await prisma.postComment.findMany({
            skip,
            take: pageMeta.pageSize,
            where: {
                postId: postId,
                parentId: parentId || '',
                status: StatusType.ACTIVE,
            },
            orderBy: {
                createdAt: 'asc',
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                _count: {
                    select: {
                        children: true,
                        likes: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        img: true,
                    },
                },
            },
        });

        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        return NextResponse.json({
            apiRequestInfo,
            data: { pageMeta, comments },
        });
    } catch (err) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: `Fail to fetch comment of post id: ${postId}` },
            },
            { status: 500 }
        );
    }
};
