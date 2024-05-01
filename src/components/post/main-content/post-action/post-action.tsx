'use client';

import ButtonShare from '@/components/shared/button-share';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { handleLikePost } from '@/lib/action';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PostAction({
    likesCount,
    commentsCount,
    isLiked,
    postId,
}: {
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    postId: string;
}) {
    const [isClicked, setIsClicked] = useState(false);
    const [isLike, setIsLike] = useState(isLiked);
    const [totalLikes, setTotalLikes] = useState(likesCount);
    const handleLike = async () => {
        setIsClicked(true);
        const result = await handleLikePost(postId);
        if (result.isSuccess) {
            toast.success(result.message);
            if (isLike) {
                setTotalLikes(totalLikes - 1);
            } else {
                setTotalLikes(totalLikes + 1);
            }
            setIsLike(!isLike);
            setTimeout(() => setIsClicked(false), 500);
        } else {
            toast.error(result.message || 'Đã có lỗi xảy ra');
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
                    <span>{totalLikes}</span>
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
                    className={`flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 transition-all duration-500 ease-in-out transform ${
                        isClicked ? 'scale-90' : ''
                    }`}
                    onClick={handleLike}
                >
                    {isLike ? (
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
