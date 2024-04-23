import prisma from '@/lib/prisma';
import { StatusType } from '@prisma/client';
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
    const { token } = params;

    const user = await prisma.user.findFirst({
        where: {
            activateTokens: {
                some: {
                    AND: [
                        {
                            activatedAt: null,
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
