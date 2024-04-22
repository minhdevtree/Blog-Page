import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get posts',
    method: 'GET',
    requestUrl: '/api/posts',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug } = params;
    const pageMeta = {
        totalPages: 0,
        page: 0,
        totalElements: 0,
        pageSize: 5,
        hasNext: false,
        hasPrev: false,
    } as PageMeta;
    try {
        // Get searchParams from request
        const limit = request.nextUrl.searchParams.get('limit');
        const sort = request.nextUrl.searchParams.get('sort');
        const page = request.nextUrl.searchParams.get('page');
        const pageSize = request.nextUrl.searchParams.get('pageSize');

        // Validate searchParams
        try {
            const parsedLimit = parseInt(limit || '');
            if (parsedLimit < 1 || parsedLimit >= 10) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        data: {
                            error: 'Search param limit must be greater than 0 and smaller than 10',
                        },
                    },
                    { status: 400 }
                );
            }
        } catch {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { error: 'Search param limit must be number' },
                },
                { status: 400 }
            );
        }
        if (sort !== 'asc' && sort !== 'desc' && sort !== null) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: {
                        error: 'Search param sort must be asc or desc',
                    },
                },
                { status: 400 }
            );
        }
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
        // Validate pageSize parameter
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

        // Get all posts from database

        pageMeta.totalElements = await prisma.post.count({
            where: {
                parentId: null,
                OR: [
                    {
                        categories: {
                            some: {
                                slug: slug,
                            },
                        },
                    },
                    {
                        categories: {
                            some: {
                                parent: {
                                    slug: slug,
                                },
                            },
                        },
                    },
                ],
            },
        });
        pageMeta.pageSize = pageSize ? parseInt(pageSize) : pageMeta.pageSize;
        pageMeta.totalPages = Math.ceil(
            pageMeta.totalElements / pageMeta.pageSize
        );
        pageMeta.page = parseInt(page || '1');
        pageMeta.hasNext = pageMeta.page < pageMeta.totalPages;
        pageMeta.hasPrev = pageMeta.page > 1;

        const skip = (pageMeta.page - 1) * pageMeta.pageSize;

        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        // Get all posts from database
        const posts = await prisma.post.findMany({
            skip,
            where: {
                parentId: null,
                OR: [
                    {
                        categories: {
                            some: {
                                slug: slug,
                            },
                        },
                    },
                    {
                        categories: {
                            some: {
                                parent: {
                                    slug: slug,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: { publishedAt: sort === 'asc' ? 'asc' : 'desc' },
            take: pageMeta.pageSize,
            select: {
                id: true,
                title: true,
                summary: true,
                content: true,
                publishedAt: true,
                published: true,
                slug: true,
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        img: true,
                        username: true,
                    },
                },
                categories: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
                tags: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
                metas: {
                    select: {
                        id: true,
                        key: true,
                        value: true,
                    },
                },
            },
        });

        return NextResponse.json({ apiRequestInfo, data: { pageMeta, posts } });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch posts' } },
            { status: 500 }
        );
    }
};
