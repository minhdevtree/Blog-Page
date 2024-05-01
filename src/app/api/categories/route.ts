import { ApiRequestInfo } from '@/lib/define';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import { getRedisInstance } from '@/config/redis';

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

        const redis = getRedisInstance();
        const cachedCategories = await redis.get('categories');

        if (cachedCategories) {
            return NextResponse.json({
                apiRequestInfo,
                data: JSON.parse(cachedCategories),
            });
        } else {
            // Get all posts from database
            const categories = await prisma.category.findMany({
                where: { parentId: null },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    slug: true,
                    children: true,
                },
            });

            const MAX_AGE = 60 * 60 * 24; // 24 hours in seconds
            const EXPIRY_MS = 'EX'; // seconds

            await redis.set(
                'categories',
                JSON.stringify(categories),
                EXPIRY_MS,
                MAX_AGE
            );

            return NextResponse.json({ apiRequestInfo, data: categories });
        }
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch categories' } },
            { status: 500 }
        );
    }
};
