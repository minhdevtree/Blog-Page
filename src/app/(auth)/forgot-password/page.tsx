import { ForgotPasswordForm } from '@/components/auth/forgot-password/forgot-password-form';

export default function ForgotPasswordPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center text-sky-500">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Đặt lại mật khẩu
                </h1>
                <p className="text-sm text-muted-foreground">
                    Vui lòng nhập email để đặt lại mật khẩu
                </p>
            </div>
            <ForgotPasswordForm />
        </>
    );
}
