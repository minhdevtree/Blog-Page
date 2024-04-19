import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import getClientIp from 'get-client-ip';
import { StatusType } from '@prisma/client';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get post',
    method: 'GET',
    requestUrl: '/api/post/[slug]/comments/[parentId]',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string; parentId: string } }
) => {
    const { slug, parentId } = params;
    console.log('slug:', slug);
    console.log('parentId:', parentId);
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: slug,
                parent: null,
            },
            select: {
                comments: {
                    where: {
                        parentId: parentId || '',
                        status: StatusType.ACTIVE,
                    },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                img: true,
                            },
                        },
                    },
                },
            },
        });

        // Get client IP
        const ip = getClientIp(request);
        apiRequestInfo.clientIp = ip || 'Unknown';

        return NextResponse.json({ apiRequestInfo, data: post });
    } catch (err) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: `Fail to fetch comment of post slug: ${slug}` },
            },
            { status: 500 }
        );
    }
};
