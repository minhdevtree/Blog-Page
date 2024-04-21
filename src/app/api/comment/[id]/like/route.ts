import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const currentTime = new Date().toISOString();
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Like Post',
    method: 'GET',
    requestUrl: '/api',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

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
