import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
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
    apiName: 'Forgot password input email',
    method: 'POST',
    requestUrl: '/api/auth/forgot-password',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export async function POST(req: NextRequest) {
    // Get client IP
    apiRequestInfo.clientIp =
        req.ip || req.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        const body = await req.json();
        const { email } = body;

        let user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, username: true, status: true, loginType: true },
        });

        if (!user) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Email không tồn tại',
                },
                { status: 404 }
            );
        }

        if (user.status === StatusType.BANNED) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã bị khóa, không thể gửi email đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }
        if (user.status === StatusType.DELETED) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã bị xóa, không thể gửi email đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }

        if (user.loginType !== LoginType.LOCAL) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã được đăng nhập thông qua mạng xã hội, không thể gửi email đặt lại mật khẩu',
                },
                { status: 400 }
            );
        }

        const activateToken = await prisma.activateToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                type: ActivateType.PASSWORD_RESET,
            },
        });

        const template = handlebars.compile(forgotPassword);
        const htmlToSend = template({
            siteConfigName: siteConfig.name,
            activeLink: `${siteConfig.url}/api/auth/activate/${activateToken.token}?active=PASSWORD_RESET`,
        });

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: email,
            subject: `Đổi mật khẩu ${siteConfig.name}`,
            text: `Đổi mật khẩu ${siteConfig.name}. Link đổi mật khẩu của bạn: ${siteConfig.url}/api/auth/activate/${activateToken.token}?active=PASSWORD_RESET \n\n Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này. \n\n ${siteConfig.name} - ${siteConfig.url}`,
            html: htmlToSend,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Email kích hoạt đã được gửi',
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                error: 'Đã có lỗi xảy ra trong khi gửi email kích hoạt',
            },
            { status: 500 }
        );
    }
}
