import { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { auth } from '@/lib/auth';

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

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <Toaster />
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
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
            </body>
        </html>
    );
}
