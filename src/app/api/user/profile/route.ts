import { ApiRequestInfo } from '@/lib/define';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import { auth } from '@/lib/auth';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get login user profile',
    method: 'GET',
    requestUrl: '/api/user/profile',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    try {
        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const session = await auth();

        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id,
            },
            select: {
                fullName: true,
                username: true,
                email: true,
                phoneNumber: true,
                intro: true,
                img: true,
                role: true,
                loginType: true,
                urls: {
                    select: {
                        url: true,
                    },
                },
            },
        });

        return NextResponse.json({ apiRequestInfo, data: user });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch top creator' } },
            { status: 500 }
        );
    }
};
