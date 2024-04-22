import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage({
    searchParams,
}: {
    searchParams: { error: string };
}) {
    const error = searchParams.error;
    const getErrorMessage = () => {
        switch (error) {
            case 'account_banned':
                return 'Tài khoản của bạn đã bị cấm truy cập.';
            default:
                return 'Nếu bạn nghĩ đây là một lỗi, vui lòng liên hệ với admin.';
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold text-sky-500">403</h1>
            <h2 className="text-xl font-semibold text-sky-500">
                Truy cập bị từ chối
            </h2>
            <p className="text-lg text-center text-muted-foreground">
                {getErrorMessage()}
            </p>
            <Link href="/login">
                <Button>Đăng nhập</Button>
            </Link>
        </div>
    );
}
