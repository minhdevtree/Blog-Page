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
    { params }: { params: { slug: string } }
) => {
    const { slug: postId } = params;

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
        const like = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (like) {
            await prisma.like.delete({
                where: {
                    id: like.id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã bỏ thích bài viết' },
                },
                { status: 200 }
            );
        } else {
            await prisma.like.create({
                data: {
                    userId: userId || '',
                    postId,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã thích bài viết' },
                },
                { status: 200 }
            );
        }
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi thích bài viết' },
            },
            { status: 500 }
        );
    }
};

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug: id } = params;

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
        (await prisma.like.findFirst({
            where: {
                userId: session?.user?.id,
                postId: id,
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
