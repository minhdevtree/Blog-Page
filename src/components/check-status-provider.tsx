'use client';

import { useEffect, useState, useCallback } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserStatus } from '@/lib/action';

export function CheckStatusProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const router = useRouter();
    const [userStatus, setUserStatus] = useState('');

    const checkUserStatus = useCallback(async () => {
        try {
            const status = await getUserStatus();
            setUserStatus(status);
        } catch (error) {
            setUserStatus('UNAUTHENTICATED');
        }
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const checkStatusInterval = () => {
            intervalId = setInterval(() => {
                if (session) {
                    checkUserStatus();
                }
            }, +(process.env.NEXT_PUBLIC_TIME_OUT_CHECK_ACCOUNT_MS || 10000)); // Set the interval here
        };

        checkStatusInterval(); // Initial check when the component mounts

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [session, checkUserStatus]);

    useEffect(() => {
        if (userStatus === 'BANNED') {
            signOut({ redirect: false }).then(() => {
                router.push('/unauthorized?error=account_banned');
                router.refresh();
            });
        }
        if (userStatus === 'DELETED') {
            signOut({ redirect: false }).then(() => {
                router.push('/unauthorized?error=account_deleted');
                router.refresh();
            });
        }
        if (userStatus === 'UNAUTHENTICATED') {
            signOut({ redirect: false }).then(() => {
                router.push('/unauthorized?error=unauthenticated');
                router.refresh();
            });
        }
    }, [userStatus, router]);

    return <>{children}</>;
}
