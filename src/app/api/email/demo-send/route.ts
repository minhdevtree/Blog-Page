import { ApiRequestInfo } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import { transporter } from '@/config/nodemailer';
import * as handlebars from 'handlebars';
import path from 'path';
import { readFileSync } from 'fs';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Send email',
    method: 'POST',
    requestUrl: '/api/email/demo-send',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export async function POST(req: NextRequest) {
    // Get client IP
    apiRequestInfo.clientIp =
        req.ip || req.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        const body = await req.json();
        const { email } = body;

        const __dirname = path.resolve();
        const filePath = path.join(__dirname, 'src/template/demo.html');
        const source = readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            demo1: 'Demo 1',
            demo2: 'Demo 2',
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: email,
            subject: 'Test email',
            text: 'This is a test email',
            html: '<h1>Test email</h1><p>This is a test email</p>',
        };
        console.log('mailOptions', mailOptions);

        transporter.sendMail(mailOptions);

        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Email đã được gửi thành công',
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Đã có lỗi xảy ra trong khi gửi email',
            },
            { status: 500 }
        );
    }
}
