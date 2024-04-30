import { ApiRequestInfo } from '@/lib/define';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { profileFormSchema } from '@/lib/form-schema';
import { LoginType, StatusType } from '@prisma/client';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Update login user profile',
    method: 'GET',
    requestUrl: '/api/user/profile/update',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (request: NextRequest) => {
    try {
        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const session = await auth();

        const body = await request.json();
        const { fullName, username, email, phoneNumber, bio, urls } =
            profileFormSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id,
            },
            select: {
                username: true,
                email: true,
            },
        });

        if (user?.username !== username) {
            const isUsernameExist = await prisma.user.findUnique({
                where: {
                    username,
                },
            });

            if (isUsernameExist) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        data: {
                            error: 'Tên người dùng đã tồn tại',
                        },
                    },
                    { status: 400 }
                );
            }
        }

        if (user?.email !== email) {
            const isEmailExist = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (isEmailExist?.loginType !== LoginType.LOCAL) {
                return NextResponse.json({
                    apiRequestInfo,
                    data: {
                        error: 'Không thể cập nhật email của tài khoản này do email được quản lý bởi bên thứ ba.',
                    },
                });
            }

            if (isEmailExist) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        data: {
                            error: 'Email đã tồn tại',
                        },
                    },
                    { status: 400 }
                );
            } else {
                await prisma.user.update({
                    where: {
                        id: session?.user?.id,
                    },
                    data: {
                        status: StatusType.NOT_ACTIVE,
                        email,
                    },
                });
                // NextResponse.redirect(
                //     process.env.NEXT_PUBLIC_SITE_URL + '/logout'
                // );
            }
        }

        if (urls && urls.length > 5) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    data: {
                        error: 'Số lượng URL không được vượt quá 5',
                    },
                },
                { status: 400 }
            );
        }
        await prisma.userUrl.deleteMany({
            where: {
                userId: session?.user?.id,
            },
        });
        if (urls && urls.length > 0) {
            await prisma.userUrl.createMany({
                data: urls.map(url => ({
                    userId: session?.user?.id || '',
                    url: url.value,
                })),
            });
        }

        await prisma.user.update({
            where: {
                id: session?.user?.id,
            },
            data: {
                fullName,
                username,
                email,
                phoneNumber,
                intro: bio,
            },
        });

        return NextResponse.json(
            { apiRequestInfo, data: { isSuccess: true } },
            { status: 200 }
        );
    } catch (err) {
        console.log('err', err);
        return NextResponse.json(
            {
                apiRequestInfo,
                data: { error: 'Có lỗi xảy ra khi cập nhật hồ sơ' },
            },
            { status: 500 }
        );
    }
};
