import { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { Suspense } from 'react';
import FullPageLoadingOverlay from '@/components/shared/full-page-loading-overlay';
import { AutoLogoutProvider } from '@/components/auto-logout-provider';
import Providers from '@/components/providers';
import { CheckStatusProvider } from '@/components/check-status-provider';

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
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased transition-colors duration-1000',
                    fontSans.variable
                )}
            >
                <Suspense fallback={<FullPageLoadingOverlay />}>
                    <Providers>
                        <CheckStatusProvider>
                            <AutoLogoutProvider>
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
                            </AutoLogoutProvider>
                        </CheckStatusProvider>
                    </Providers>
                </Suspense>
                <Toaster />
            </body>
        </html>
    );
}
