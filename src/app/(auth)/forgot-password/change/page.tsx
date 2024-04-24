import { ChangePasswordForm } from '@/components/auth/forgot-password/change-password-form';

export default async function ChangePage({
    searchParams,
}: Readonly<{ searchParams: { token?: string } }>) {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center text-sky-500">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Đặt lại mật khẩu
                </h1>
            </div>
            <ChangePasswordForm token={searchParams.token || ''} />
        </>
    );
}
