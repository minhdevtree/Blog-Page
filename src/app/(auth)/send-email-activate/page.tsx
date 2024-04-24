import UserAuthSendEmailActivate from '@/components/auth/send-email-activate/user-auth-send-email-activate-form';
import { Suspense } from 'react';

import React from 'react';

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-sky-500">
                    Gửi email kích hoạt tài khoản
                </h1>
            </div>
            <div className="grid gap-6">
                <Suspense
                    fallback={
                        <div className="text-center">
                            Đang tải form gửi email...
                        </div>
                    }
                >
                    <UserAuthSendEmailActivate />
                </Suspense>
            </div>
        </>
    );
}
