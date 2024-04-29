import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { createRedisInstance } from '@/config/redis';

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
    // Get client IP
    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        const redis = createRedisInstance();

        const cachedPostDetail = await redis.get(`post-detail:${slug}`);

        const count = await prisma.post.findUnique({
            where: {
                slug: slug,
                parent: null,
            },
            select: {
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
        });

        if (cachedPostDetail) {
            if (count) {
                const postDetail = JSON.parse(cachedPostDetail);
                postDetail._count = count._count;
                return NextResponse.json({
                    apiRequestInfo,
                    data: postDetail,
                });
            }
            return NextResponse.json({
                apiRequestInfo,
                data: JSON.parse(cachedPostDetail),
            });
        } else {
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

            const MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
            const EXPIRY_MS = 'EX'; // seconds

            await redis.set(
                `post-detail:${slug}`,
                JSON.stringify(post),
                EXPIRY_MS,
                MAX_AGE
            );

            return NextResponse.json({ apiRequestInfo, data: post });
        }
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
