import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/edit-profile/side-bar-nav';

export const metadata: Metadata = {
    title: 'Cài đặt tài khoản',
    description: 'Quản lý thông tin cá nhân và cài đặt tài khoản',
};

const sidebarNavItems = [
    {
        title: 'Hồ sơ',
        href: '/edit-profile',
    },
    {
        title: 'Giao diện',
        href: '/edit-profile/appearance',
    },
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight text-sky-500">
                    Cài đặt tài khoản
                </h2>
                <p className="text-muted-foreground">
                    Quản lý thông tin cá nhân và cài đặt tài khoản
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
