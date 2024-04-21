import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get posts',
    method: 'GET',
    requestUrl: '/api/posts',
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

        return NextResponse.json({ apiRequestInfo, data: posts });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch tags.' } },
            { status: 500 }
        );
    }
};
