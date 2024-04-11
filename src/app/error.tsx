'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <>
            <div className="w-full h-[90vh] flex flex-col justify-center">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="text-center text-xl">
                            Lỗi không xác định
                        </div>
                        <div className="text-center text-lg text-neutral-600">
                            Đáng tiếc, đã xảy ra lỗi không xác định
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <Image
                            src="/not-found/404.png"
                            alt="404 Not Found"
                            width={300}
                            height={300}
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="flex justify-center gap-3">
                        <Link href="">
                            <Button
                                onClick={
                                    // Attempt to recover by trying to re-render the segment
                                    () => reset()
                                }
                            >
                                Thử lại
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline">Trang chủ</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
