'use client';

import { logout } from '@/lib/action';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.push('/login'); // redirect to login after logout
        });
    }, []);

    return (
        <div>
            <h1>Đang đăng xuất...</h1>
        </div>
    );
}
