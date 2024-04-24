import prisma from '@/lib/prisma';
import { ActivateType, LoginType, StatusType } from '@prisma/client';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
    _request: NextRequest,
    {
        params,
    }: {
        params: { token: string };
    }
) {
    const active = _request.nextUrl.searchParams.get('active');
    const { token } = params;

    const getType = () => {
        switch (active) {
            case 'EMAIL_VERIFY':
                return ActivateType.EMAIL_VERIFY;
            case 'PASSWORD_RESET':
                return ActivateType.PASSWORD_RESET;
            default:
                return ActivateType.EMAIL_VERIFY;
        }
    };

    const user = await prisma.user.findFirst({
        where: {
            activateTokens: {
                some: {
                    AND: [
                        {
                            activatedAt: null,
                        },
                        {
                            type: getType(),
                        },
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes
                            },
                        },
                        {
                            token,
                        },
                    ],
                },
            },
        },
    });

    if (!user) {
        redirect('/activate?message=invalid_token');
    }
    if (
        user.status === StatusType.ACTIVE &&
        getType() === ActivateType.EMAIL_VERIFY
    ) {
        redirect('/activate?message=invalid_token');
    }

    if (getType() === ActivateType.EMAIL_VERIFY) {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                status: StatusType.ACTIVE,
            },
        });

        await prisma.activateToken.update({
            where: {
                token,
            },
            data: {
                activatedAt: new Date(),
            },
        });

        redirect('/activate?message=activated');
    }

    if (getType() === ActivateType.PASSWORD_RESET) {
        if (user.loginType === LoginType.LOCAL) {
            // await prisma.activateToken.update({
            //     where: {
            //         token,
            //     },
            //     data: {
            //         activatedAt: new Date(),
            //     },
            // });
            redirect('/forgot-password/change?token=' + token);
        }
        redirect('/activate?message=invalid_email');
    }
}
