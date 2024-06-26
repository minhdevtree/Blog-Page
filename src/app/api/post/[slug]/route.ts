import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { getRedisInstance } from '@/config/redis';
import { auth } from '@/lib/auth';
import { PublishedType } from '@prisma/client';

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
        const redis = getRedisInstance();

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
                authorId: true,
                published: true,
            },
        });

        if (count?.published === PublishedType.PUBLISHED_SUBSCRIBERS) {
            // Check if user has followed author or not
            const session = await auth();
            let isFollowed = false;
            if (session) {
                const followResult = await prisma.follow.findFirst({
                    where: {
                        followerId: session?.user?.id,
                        followingId: count?.authorId || '',
                    },
                });
                isFollowed = followResult !== null;
            }

            if (!isFollowed) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        data: {},
                        error: 'Bài viết này chỉ dành cho người theo dõi tác giả',
                    },
                    { status: 403 }
                );
            }
        }

        if (cachedPostDetail) {
            if (count) {
                const postDetail = JSON.parse(cachedPostDetail);
                postDetail._count = count._count;
                postDetail.published = count.published;
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
                data: {},
                error: `Fail to fetch post slug: ${slug}`,
            },
            { status: 500 }
        );
    }
};
