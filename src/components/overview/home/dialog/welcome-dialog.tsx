'use client';

import OtherLoginMethod from '@/components/auth/login/other-login-method';
import { Icons } from '@/components/icons/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

export function WelcomeDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleOpenChange = () => {
        setOpen(!open);
    };

    const handleRedirectLoginPage = () => {
        setOpen(false);
        router.push('/login');
    };
    const handleRedirectRegisterPage = () => {
        setOpen(false);
        router.push('/register');
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[800px] p-7">
                <div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="max-sm:hidden">
                            <AspectRatio
                                ratio={1 / 1}
                                className="bg-muted col-span-1"
                            >
                                <Image
                                    src="/auth/blue-sky.png"
                                    alt="Welcome dialog image"
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col justify-between">
                            <div className="text-3xl font-bold text-center">
                                Chào mừng bạn đến với
                                <div className="text-sky-500 text-center">
                                    {siteConfig.name}
                                </div>
                            </div>
                            <div className="mx-auto">
                                <div className="text-lg flex flex-col justify-center">
                                    <div className="mx-auto p-3 m-3 bg-white rounded-lg">
                                        <Icons.cloud />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 mt-2">
                                <div className="flex gap-5 mx-auto">
                                    <Button onClick={handleRedirectLoginPage}>
                                        Đăng nhập
                                    </Button>

                                    <Button
                                        onClick={handleRedirectRegisterPage}
                                    >
                                        Đăng ký
                                    </Button>
                                </div>

                                <OtherLoginMethod />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
