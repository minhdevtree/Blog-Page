'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ButtonLogin() {
    const pathname = usePathname();
    return (
        <Button asChild>
            <Link href={`/login?callbackUrl=${pathname}`}>Đăng nhập</Link>
        </Button>
    );
}
