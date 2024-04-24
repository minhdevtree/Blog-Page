import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    CheckCircledIcon,
    ExclamationTriangleIcon,
} from '@radix-ui/react-icons';

export default function ActivatePage({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    if (searchParams.message === 'activated') {
        return (
            <Alert>
                <CheckCircledIcon className="h-4 w-4 text-sky-500" />
                <AlertTitle className="text-sky-500">Chúc mừng</AlertTitle>
                <AlertDescription className="text-sky-500">
                    Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập
                    ngay bây giờ.
                </AlertDescription>
            </Alert>
        );
    } else if (searchParams.message === 'invalid_email') {
        return (
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>
                    Email không tồn tại trong hệ thống, hoặc được đăng nhập
                    thông qua mạng xã hội.
                </AlertDescription>
            </Alert>
        );
    } else {
        return (
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>
                    Link kích hoạt không hợp lệ hoặc đã hết hạn.
                </AlertDescription>
            </Alert>
        );
    }
}
