import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { RoleType } from '@prisma/client';

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
        const ip = getClientIp(request);
        apiRequestInfo.clientIp = ip || 'Unknown';

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

        return NextResponse.json({ apiRequestInfo, data: creators });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch top creator' } },
            { status: 500 }
        );
    }
};
