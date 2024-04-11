import { ApiRequestInfo } from '@/lib/define';
import getClientIp from 'get-client-ip';
import { NextRequest, NextResponse } from 'next/server';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get Welcome Message',
    method: 'GET',
    requestUrl: '/api',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (request: NextRequest) => {
    try {
        // Get client IP
        const ip = getClientIp(request);
        apiRequestInfo.clientIp = ip || 'Unknown';

        return NextResponse.json({
            apiRequestInfo,
            data: { message: 'Welcome to my blog' },
        });
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Fail to fetch api' } },
            { status: 500 }
        );
    }
};
