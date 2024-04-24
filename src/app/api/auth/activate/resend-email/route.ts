import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import * as handlebars from 'handlebars';
import { welcomeTemplate } from '@/lib/template/welcome';
import { siteConfig } from '@/config/site';
import { transporter } from '@/config/nodemailer';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import { StatusType } from '@prisma/client';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Resend Email Activation Link',
    method: 'POST',
    requestUrl: '/api/auth/activate/resend-email',
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
            select: { id: true, username: true, status: true },
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

        if (user.status === StatusType.ACTIVE) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    error: 'Tài khoản đã được kích hoạt, không thể gửi email kích hoạt',
                },
                { status: 400 }
            );
        }

        const activateToken = await prisma.activateToken.create({
            data: {
                userId: user.id,
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
            },
        });

        const template = handlebars.compile(welcomeTemplate);
        const htmlToSend = template({
            username: user.username,
            siteConfigName: siteConfig.name,
            activeLink: `${siteConfig.url}/api/auth/activate/${activateToken.token}`,
        });

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: email,
            subject: `Kích hoạt tài khoản ${siteConfig.name}`,
            text: `Chào mừng ${user.username} đến với ${siteConfig.name}. Link kích hoạt tài khoản của bạn: ${siteConfig.url}/api/auth/activate/${activateToken.token}`,
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
                message: 'Đã có lỗi xảy ra trong khi gửi email kích hoạt',
            },
            { status: 500 }
        );
    }
}
