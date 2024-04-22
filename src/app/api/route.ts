import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get Welcome Message',
    method: 'GET',
    requestUrl: '/api',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    const session = await auth();
    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        return NextResponse.json({
            apiRequestInfo,
            data: {
                email: session?.user?.email || 'Not login yet',
                message: 'Welcome to my blog',
            },
        });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch api' } },
            { status: 500 }
        );
    }
};
