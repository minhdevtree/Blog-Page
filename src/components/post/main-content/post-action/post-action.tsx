'use client';

import ButtonShare from '@/components/shared/button-share';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { handleLikePost } from '@/lib/action';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PostAction({
    likesCount,
    commentsCount,
    userId,
    isLiked,
    postId,
}: {
    likesCount: number;
    commentsCount: number;
    userId: string;
    isLiked: boolean;
    postId: string;
}) {
    const router = useRouter();
    const handleLike = async () => {
        if (!userId) {
            router.push('/login');
        } else {
            const result = await handleLikePost(postId, userId);
            if (result.isSuccess) {
                toast.success(result.message);
            } else {
                toast.error(result.error || 'Đã có lỗi xảy ra');
            }
            router.refresh();
        }
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        const element = document.getElementById('post-comment');
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // offset by 100px
                behavior: 'smooth',
            });
        }
    };
    return (
        <>
            <div className="flex gap-4 mt-10">
                <div className="flex gap-2 items-center">
                    <Heart className="w-4 h-4" />
                    <span>{likesCount}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <MessageCircle className="w-4 h-4" />
                    <span>{commentsCount}</span>
                </div>
            </div>
            <Separator className="mb-2 md:mb-5 mt-2" />
            <div className="flex justify-between md:px-10 text-sky-500">
                <Button
                    variant="hidden"
                    className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100"
                    onClick={handleLike}
                >
                    {isLiked ? (
                        <>
                            <HeartFilledIcon className="w-7 h-7" />
                            <span className="max-md:hidden">Đã thích</span>
                        </>
                    ) : (
                        <>
                            <HeartIcon className="w-7 h-7" />
                            <span className="max-md:hidden">Thích</span>
                        </>
                    )}
                </Button>
                <Link
                    href="#post-comment"
                    className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 p-2 px-5 rounded-md"
                    onClick={e => handleClick(e)}
                >
                    <MessageCircle />
                    <span className="max-md:hidden">Bình luận</span>
                </Link>
                <ButtonShare />
            </div>
            <Separator className="my-2 md:my-5" />
        </>
    );
}
