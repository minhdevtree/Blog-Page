import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { createRedisInstance } from '@/config/redis';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get popular tags',
    method: 'GET',
    requestUrl: '/api/tags/popular-tags',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest, response: NextResponse) => {
    const limit = request.nextUrl.searchParams.get('limit');
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

    try {
        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const redis = createRedisInstance();
        const cachedPopularTags = await redis.get(`popular-tags:${limit}`);

        if (cachedPopularTags) {
            return NextResponse.json({
                apiRequestInfo,
                data: JSON.parse(cachedPopularTags),
            });
        } else {
            // Get all posts from database
            const posts = await prisma.tag.findMany({
                orderBy: { posts: { _count: 'desc' } },
                take: limit ? parseInt(limit) : 5,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    _count: {
                        select: { posts: true },
                    },
                },
            });

            const MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
            const EXPIRY_MS = 'EX'; // seconds

            await redis.set(
                `popular-tags:${limit}`,
                JSON.stringify(posts),
                EXPIRY_MS,
                MAX_AGE
            );

            return NextResponse.json({ apiRequestInfo, data: posts });
        }
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch tags.' } },
            { status: 500 }
        );
    }
};
