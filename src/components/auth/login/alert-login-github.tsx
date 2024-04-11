'use client';

import { Icons } from '@/components/icons/icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { githubLogin } from '@/lib/action';
import { toast } from 'sonner';

export function AlertLoginGithub() {
    const handleShowToast = () => {
        toast.success('Đang thực hiện đăng nhập bằng Github...');
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" type="submit" className="w-full">
                    <Icons.gitHub className="mr-2 h-4 w-4 text-sky-500" />
                    Github
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Lưu ý</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tính năng đăng nhập bằng Github đang được phát triển nên
                        có thể gặp lỗi. Bạn có muốn tiếp tục không?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Huỷ</AlertDialogCancel>
                    <form
                        action={githubLogin}
                        className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
                    >
                        <AlertDialogAction
                            type="submit"
                            onClick={handleShowToast}
                        >
                            Có
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
