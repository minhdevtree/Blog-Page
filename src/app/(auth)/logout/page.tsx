// 'use client';

import { logout } from '@/lib/action';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function LogoutPage() {
    // const route = useRouter();
    // // useEffect(() => {
    // //     signOut({ redirect: false }).then(() => {
    // //         route.push('/login');
    // //         route.refresh();
    // //     });
    // // }, [route]);
    logout();
    // route.push('/login');
    return (
        <div>
            <h1>Đang đăng xuất...</h1>
        </div>
    );
}
