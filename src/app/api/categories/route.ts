import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const currentTime = new Date().toISOString();
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

        return NextResponse.json({ apiRequestInfo, data: categories });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch categories' } },
            { status: 500 }
        );
    }
};
