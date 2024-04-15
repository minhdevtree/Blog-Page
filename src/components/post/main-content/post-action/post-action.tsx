'use client';

import ButtonShare from '@/components/shared/button-share';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { handleLikePost } from '@/lib/action';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
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
            <Separator className="mb-5 mt-2" />
            <div className="flex justify-between md:px-10 text-sky-500">
                <Button
                    variant="hidden"
                    className="flex gap-2 items-center hover:text-sky-600"
                    onClick={handleLike}
                >
                    {isLiked ? (
                        <>
                            <HeartFilledIcon className="w-7 h-7" />
                            <span>Đã thích</span>
                        </>
                    ) : (
                        <>
                            <HeartIcon className="w-7 h-7" />
                            <span>Thích</span>
                        </>
                    )}
                </Button>
                <div className="flex gap-2 items-center">
                    <MessageCircle />
                    <span>Bình luận</span>
                </div>
                <ButtonShare />
            </div>
            <Separator className="my-5" />
        </>
    );
}
