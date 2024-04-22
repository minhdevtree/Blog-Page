import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-4xl font-bold text-sky-500">403</h1>
            <h2 className="text-xl font-semibold text-sky-500">
                Truy cập bị từ chối
            </h2>
            <p className="text-lg text-center text-muted-foreground">
                Nếu bạn nghĩ đây là một lỗi, vui lòng liên hệ với admin.
            </p>
            <Link href="/login">
                <Button>Đăng nhập</Button>
            </Link>
        </div>
    );
}
