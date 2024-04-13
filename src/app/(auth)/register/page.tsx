import { UserAuthRegisterForm } from '@/components/auth/register/user-auth-register-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

import React from 'react';

export const metadata: Metadata = {
    title: 'Đăng ký',
    description: 'Đăng ký tài khoản của bạn',
};

export default function RegisterPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-sky-500">
                    Đăng ký tài khoản
                </h1>
            </div>
            <div className="grid gap-6">
                <Suspense
                    fallback={
                        <div className="text-center">
                            Đang tải form đăng ký...
                        </div>
                    }
                >
                    <UserAuthRegisterForm />
                </Suspense>
                {/* <OtherLoginMethod /> */}
            </div>
        </>
    );
}
