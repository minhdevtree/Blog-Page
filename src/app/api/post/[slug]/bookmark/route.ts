import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { UserLimitType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Like Post',
    method: 'GET',
    requestUrl: '/api/post/[postId]/bookmark',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug: id } = params;

    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();
    const isAddToBookmark =
        (await prisma.bookMark.findFirst({
            where: {
                userId: session?.user?.id,
                postId: id,
            },
        })) !== null;

    return NextResponse.json(
        {
            apiRequestInfo,
            data: { isBookmark: isAddToBookmark },
        },
        { status: 200 }
    );
};

export const POST = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    const { slug: postId } = params;

    apiRequestInfo.method = 'POST';

    apiRequestInfo.clientIp =
        request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

    const session = await auth();

    const isLimit =
        (await prisma.userLimit.findFirst({
            where: {
                userId: session?.user?.id,
                limit: UserLimitType.BOOKMARK,
            },
        })) !== null;

    if (isLimit) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: {
                    error: 'Tài khoản của bạn đã bị hạn chế lưu bài viết',
                },
            },
            { status: 403 }
        );
    }

    try {
        const userId = session?.user?.id;
        const bookmark = await prisma.bookMark.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (bookmark) {
            await prisma.bookMark.delete({
                where: {
                    id: bookmark.id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã bỏ lưu bài viết' },
                },
                { status: 200 }
            );
        } else {
            console.log('create');
            await prisma.bookMark.create({
                data: {
                    userId: userId || '',
                    postId,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã lưu bài viết' },
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi lưu bài viết' },
            },
            { status: 500 }
        );
    }
};
