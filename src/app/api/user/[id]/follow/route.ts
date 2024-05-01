import { auth } from '@/lib/auth';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { UserLimitType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Follow User',
    method: 'GET',
    requestUrl: '/api/user/[id]/follow',
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
                limit: UserLimitType.FOLLOW,
            },
        })) !== null;

    if (isLimit) {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: {
                    error: 'Tài khoản của bạn đã bị hạn chế theo dõi người dùng',
                },
            },
            { status: 403 }
        );
    }

    try {
        const userId = session?.user?.id;
        const follow = await prisma.follow.findFirst({
            where: {
                followerId: userId,
                followingId: id,
            },
        });

        if (follow) {
            await prisma.follow.delete({
                where: {
                    id: follow.id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã bỏ theo dõi' },
                },
                { status: 200 }
            );
        } else {
            await prisma.follow.create({
                data: {
                    followerId: userId || '',
                    followingId: id,
                },
            });
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: { isSuccess: true, message: 'Đã theo dõi' },
                },
                { status: 200 }
            );
        }
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Đã xảy ra lỗi khi theo dõi' },
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

    const isFollowed = await prisma.follow.findFirst({
        where: {
            followerId: session?.user?.id,
            followingId: id,
        },
    });

    return NextResponse.json(
        {
            apiRequestInfo,
            data: { isFollowed: isFollowed },
        },
        { status: 200 }
    );
};
