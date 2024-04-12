import { Metadata } from 'next';
import React from 'react';
import SwitchPage from '@/components/auth/switch-page';
import LogoSite from '@/components/overview/logo-site';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: {
        default: `Authentication | ${siteConfig.name}`,
        template: `%s | ${siteConfig.name}`,
    },
    description: 'Thực hiện xác thực người dùng tại đây',
};

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="container relative min-h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href={'/'}
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute md:hidden left-4 top-4'
                )}
            >
                Home
            </Link>
            <SwitchPage />
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900 bg-auth bg-cover" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <LogoSite />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2 text-sky-500">
                        <p className="text-lg">
                            &ldquo;Đéo biết nói câu đạo lý gì hay ở chỗ
                            này!&rdquo;
                        </p>
                        <footer className="text-sm">Minh Đẹp Trai</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
