import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import getClientIp from 'get-client-ip';
import { StatusType } from '@prisma/client';
import { create } from 'domain';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Get post',
    method: 'GET',
    requestUrl: '/api/post/[postId]/comments',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug: postId } = params;
    try {
        const post = await prisma.postComment.findMany({
            where: {
                postId: postId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        img: true,
                    },
                },
            },
        });

        // Get client IP
        const ip = getClientIp(request);
        apiRequestInfo.clientIp = ip || 'Unknown';

        return NextResponse.json({ apiRequestInfo, data: post });
    } catch (err) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: `Fail to fetch comment of post id: ${postId}` },
            },
            { status: 500 }
        );
    }
};
