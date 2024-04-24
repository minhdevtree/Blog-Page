import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted, hashPassword } from '@/lib/utils';
import * as handlebars from 'handlebars';
import { welcomeTemplate } from '@/lib/template/welcome';
import { siteConfig } from '@/config/site';
import { transporter } from '@/config/nodemailer';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import { ActivateType, LoginType, StatusType } from '@prisma/client';
import { forgotPassword } from '@/lib/template/forgot-password';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Forgot password change',
    method: 'POST',
    requestUrl: '/api/auth/forgot-password/change',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export async function POST(req: NextRequest) {
    // Get client IP
    apiRequestInfo.clientIp =
        req.ip || req.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        const body = await req.json();
        const { token, password } = body;

        const user = await prisma.user.findFirst({
            where: {
                activateTokens: {
                    some: {
                        AND: [
                            {
                                activatedAt: null,
                            },
                            {
                                type: ActivateType.PASSWORD_RESET,
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
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Token không hợp lệ',
                },
                { status: 404 }
            );
        }

        if (user.status === StatusType.BANNED) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã bị khóa, không thể đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }
        if (user.status === StatusType.DELETED) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã bị xóa, không thể đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }

        if (user.loginType !== LoginType.LOCAL) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã được đăng nhập thông qua mạng xã hội, không thể đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }

        await prisma.activateToken.update({
            where: {
                token,
            },
            data: {
                activatedAt: new Date(),
            },
        });

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashPassword(password),
            },
        });

        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Đã đặt lại mật khẩu thành công',
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                error: 'Đã có lỗi xảy ra khi đặt lại mật khẩu',
            },
            { status: 500 }
        );
    }
}
