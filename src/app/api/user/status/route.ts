import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get user account status',
    method: 'GET',
    requestUrl: '/api/user/status',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();
    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id,
        },
        select: {
            email: true,
            status: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Không tìm thấy thông tin người dùng' },
            },
            { status: 404 }
        );
    } else {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { email: user.email, status: user.status },
            },
            { status: 200 }
        );
    }
};
