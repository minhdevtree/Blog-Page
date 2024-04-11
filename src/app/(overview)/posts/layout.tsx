import type { Metadata } from 'next';

import HeaderSite from '@/components/overview/header/header-site';
import FooterSite from '@/components/overview/footer/footer-site';

export const metadata: Metadata = {
    title: 'Tất cả bài viết',
    description: 'Toàn bộ bài viết được hiển thị tại đây',
};

export default function PostsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:px-20">{children}</div>
        </>
    );
}
