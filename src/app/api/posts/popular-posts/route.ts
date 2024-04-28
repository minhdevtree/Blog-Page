import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { createRedisInstance } from '@/config/redis';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get posts',
    method: 'GET',
    requestUrl: '/api/posts',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    // const accessToken = request.headers.get('authorization');

    try {
        // Get searchParams from request
        const limit = request.nextUrl.searchParams.get('limit');

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

        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const redis = createRedisInstance();
        const cachedPopularPosts = await redis.get('popularPosts');
        if (cachedPopularPosts) {
            return NextResponse.json({
                apiRequestInfo,
                data: JSON.parse(cachedPopularPosts),
            });
        } else {
            // Get all posts from database
            const posts = await prisma.post.findMany({
                where: { parentId: null },
                orderBy: {
                    likes: {
                        _count: 'desc',
                    },
                },
                take: limit ? parseInt(limit) : 5,
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
                    _count: {
                        select: {
                            likes: true,
                        },
                    },
                },
            });

            const MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
            const EXPIRY_MS = 'EX'; // seconds

            await redis.set(
                'popularPosts',
                JSON.stringify(posts),
                EXPIRY_MS,
                MAX_AGE
            );

            return NextResponse.json({ apiRequestInfo, data: posts });
        }
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch posts' } },
            { status: 500 }
        );
    }
};
