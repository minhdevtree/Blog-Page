import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRequestInfo, PageMeta } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { auth } from '@/lib/auth';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Comment post',
    method: 'POST',
    requestUrl: '/api/post/[postId]/comment',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    // Get client IP
    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';
    const session = await auth();
    if (!session) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Bạn phải đăng nhập để thực hiện yêu cầu này' },
            },
            { status: 401 }
        );
    }
    const { slug: postId } = params;
    const body = await request.json();
    const { content, parentId } = body;

    try {
        await prisma.postComment.create({
            data: {
                content,
                userId: session?.user?.id,
                postId,
                parentId,
            },
        });
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { isSuccess: true, message: 'Đã bình luận bài viết' },
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi bình luận bài viết' },
            },
            { status: 500 }
        );
    }
};
