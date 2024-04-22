import { ApiRequestInfo } from '@/lib/define';
import { RegisterFormSchema } from '@/lib/form-schema';
import { hashPassword } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Register user',
    method: 'POST',
    requestUrl: '/api/auth/register',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export async function POST(req: NextRequest) {
    // Get client IP
    apiRequestInfo.clientIp =
        req.ip || req.headers.get('X-Forwarded-For') || 'Unknown';
    try {
        const body = await req.json();
        const { fullName, username, email, phoneNumber, password } =
            RegisterFormSchema.parse(body);

        let user = prisma.user.findUnique({ where: { username } });
        if (await user) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    user: null,
                    message: 'Tên đăng nhập đã tồn tại',
                },
                { status: 409 }
            );
        }

        user = prisma.user.findUnique({ where: { email } });
        if (await user) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    user: null,
                    message: 'Email đã tồn tại',
                },
                { status: 409 }
            );
        }

        if (phoneNumber) {
            user = prisma.user.findFirst({ where: { phoneNumber } });
            if (await user) {
                return NextResponse.json(
                    {
                        apiRequestInfo,
                        user: null,
                        message: 'Số điện thoại đã tồn tại',
                    },
                    { status: 409 }
                );
            }
        }

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                phoneNumber,
                password: hashPassword(password),
            },
        });

        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            {
                apiRequestInfo,
                user: userWithoutPassword,
                message: 'Tài khoản đã được tạo thành công',
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Đã có lỗi xảy ra trong khi tạo tài khoản',
            },
            { status: 500 }
        );
    }
}
