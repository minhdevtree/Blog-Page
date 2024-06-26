import OtherLoginMethod from '@/components/auth/login/other-login-method';
import UserAuthLoginForm from '@/components/auth/login/user-auth-login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Đăng nhập',
    description: 'Đăng nhập vào tài khoản của bạn',
};

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message?: string };
}) {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-sky-500">
                    Đăng nhập
                </h1>
            </div>
            <div className="grid gap-6">
                <Suspense
                    fallback={
                        <div className="text-center">
                            Đang tải form đăng nhập...
                        </div>
                    }
                >
                    <UserAuthLoginForm message={searchParams.message} />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="text-center">
                            Đang tải chức năng login khác...
                        </div>
                    }
                >
                    <OtherLoginMethod />
                </Suspense>
            </div>
        </>
    );
}
