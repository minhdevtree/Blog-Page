import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get post',
    method: 'GET',
    requestUrl: '/api/post/[slug]',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug } = params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: slug,
                parent: null,
            },
            select: {
                id: true,
                title: true,
                summary: true,
                content: true,
                publishedAt: true,
                published: true,
                metas: {
                    select: {
                        key: true,
                        value: true,
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
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        img: true,
                        username: true,
                        _count: {
                            select: {
                                posts: true,
                                followers: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
                children: {
                    orderBy: {
                        order: 'asc',
                    },
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        order: true,
                        metas: {
                            select: {
                                key: true,
                                value: true,
                            },
                        },
                    },
                },
            },
        });

        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        return NextResponse.json({ apiRequestInfo, data: post });
    } catch (err) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: `Fail to fetch post slug: ${slug}` },
            },
            { status: 500 }
        );
    }
};
