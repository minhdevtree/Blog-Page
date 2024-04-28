import { ApiRequestInfo } from '@/lib/define';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { RoleType } from '@prisma/client';
import { getDateFormatted } from '@/lib/utils';
import { createRedisInstance } from '@/config/redis';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get categories',
    method: 'GET',
    requestUrl: '/api/categories',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    try {
        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const redis = createRedisInstance();
        const cachedTopCreators = await redis.get('topCreators');

        if (cachedTopCreators) {
            return NextResponse.json({
                apiRequestInfo,
                data: JSON.parse(cachedTopCreators),
            });
        } else {
            // Get all posts from database
            const creators = await prisma.user.findMany({
                where: { role: RoleType.WRITER },
                select: {
                    id: true,
                    username: true,
                    img: true,
                    fullName: true,
                },
                orderBy: { posts: { _count: 'desc' } },
                take: 3,
            });

            const MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
            const EXPIRY_MS = 'EX'; // seconds

            await redis.set(
                'topCreators',
                JSON.stringify(creators),
                EXPIRY_MS,
                MAX_AGE
            );

            return NextResponse.json({ apiRequestInfo, data: creators });
        }
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch top creator' } },
            { status: 500 }
        );
    }
};
