'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Địa chỉ không tồn tại',
    description: 'Không tìm thấy trang bạn đang tìm kiếm',
};

const NotFoundPage = () => {
    return (
        <>
            <div className="w-full h-[90vh] flex flex-col justify-center">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="text-center text-xl">
                            Địa chỉ không tồn tại
                        </div>
                        <div className="text-center text-lg text-neutral-600">
                            Nếu bạn nghĩ đây là một lỗi, vui lòng liên hệ với
                            admin để được hỗ trợ
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
                            <Button onClick={() => window.location.reload()}>
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

export default NotFoundPage;
