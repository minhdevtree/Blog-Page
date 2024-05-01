'use client';

import { handleBookmarkPost } from '@/lib/action';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';
import {
    BookmarkCheckIcon,
    BookmarkIcon,
    Heart,
    MessageCircle,
    SquarePen,
    UserRoundPlus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PostTime({
    publishedAt,
    commentsCount,
    likesCount,
    isBookmarked,
    postId,
}: {
    publishedAt: string;
    commentsCount: number;
    likesCount: number;
    isBookmarked: boolean;
    postId: string;
}) {
    const [isClicked, setIsClicked] = useState(false);
    const [isBookmark, setIsBookmark] = useState(isBookmarked);
    const handleBookmark = async () => {
        setIsClicked(true);
        const result = await handleBookmarkPost(postId);
        if (result.isSuccess) {
            toast.success(result.message);
            setIsBookmark(!isBookmark);
            setTimeout(() => setIsClicked(false), 500);
        } else {
            toast.error(result.message || 'Đã có lỗi xảy ra');
        }
    };
    return (
        <div className="text-base leading-none text-muted-foreground flex flex-col items-end justify-between gap-2">
            <div className="max-md:hidden">
                Đã đăng vào {getFormatDistanceToNow(publishedAt)} -{' '}
                {getDateFormatted(publishedAt)}
            </div>
            <div className="md:hidden">
                Đã đăng vào {getDateFormatted(publishedAt)}
            </div>
            <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <Heart className="w-4 h-4" />
                    <span>{likesCount}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <MessageCircle className="w-4 h-4" />
                    <span>{commentsCount}</span>
                </div>
                <button
                    onClick={handleBookmark}
                    className={`transition-all duration-500 ease-in-out transform ${
                        isClicked ? 'scale-90' : ''
                    }`}
                >
                    {isBookmark ? (
                        <div className="flex gap-1 items-center">
                            <BookmarkCheckIcon className="w-4 h-4" />
                        </div>
                    ) : (
                        <div className="flex gap-1 items-center">
                            <BookmarkIcon className="w-4 h-4" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
