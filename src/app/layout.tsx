import { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <Toaster />
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Suspense
                    fallback={
                        <div className="text-center h-screen flex flex-col justify-center text-xl">
                            Đang tải...
                        </div>
                    }
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div vaul-drawer-wrapper="">
                            <div className="relative flex min-h-screen flex-col bg-background">
                                {children}
                            </div>
                        </div>
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
