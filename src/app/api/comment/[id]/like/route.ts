import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDateFormatted } from '@/lib/utils';
import { UserLimitType } from '@prisma/client';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Like Post',
    method: 'GET',
    requestUrl: '/api/comment/[id]/like',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    apiRequestInfo.method = 'POST';

    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();

    const isLimit =
        (await prisma.userLimit.findFirst({
            where: {
                userId: session?.user?.id,
                limit: UserLimitType.LIKE_COMMENT,
            },
        })) !== null;

    if (isLimit) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: {
                    error: 'Tài khoản của bạn đã bị hạn chế thích bình luận',
                },
            },
            { status: 403 }
        );
    }

    try {
        const userId = session?.user?.id;
        const like = await prisma.postCommentLike.findFirst({
            where: {
                userId,
                postCommentId: id,
            },
        });

        if (like) {
            await prisma.postCommentLike.delete({
                where: {
                    id: like.id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã bỏ thích bình luận' },
                },
                { status: 200 }
            );
        } else {
            await prisma.postCommentLike.create({
                data: {
                    userId: userId || '',
                    postCommentId: id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã thích bình luận' },
                },
                { status: 200 }
            );
        }
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi thích bình luận' },
            },
            { status: 500 }
        );
    }
};

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();
    const isLiked =
        (await prisma.postCommentLike.findFirst({
            where: {
                userId: session?.user?.id,
                postCommentId: id,
            },
        })) !== null;

    return NextResponse.json(
        {
            apiRequestInfo,
            data: { like: isLiked },
        },
        { status: 200 }
    );
};
