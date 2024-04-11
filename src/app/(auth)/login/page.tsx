import OtherLoginMethod from '@/components/auth/login/other-login-method';
import UserAuthLoginForm from '@/components/auth/login/user-auth-login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng nhập',
    description: 'Đăng nhập vào tài khoản của bạn',
};

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-sky-500">
                    Đăng nhập
                </h1>
                {/*<p className="text-sm text-muted-foreground">*/}
                {/*  Enter your email and password below to access your account*/}
                {/*</p>*/}
            </div>
            <div className="grid gap-6">
                <UserAuthLoginForm />
                <OtherLoginMethod />
            </div>
        </>
    );
}
