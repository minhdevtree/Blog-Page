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
    const router = useRouter();
    const handleBookmark = async () => {
        const result = await handleBookmarkPost(postId);
        if (result.isSuccess) {
            toast.success(result.message);
        } else {
            toast.error(result.message || 'Đã có lỗi xảy ra');
        }
        router.refresh();
    };
    return (
        <div className="text-base leading-none text-muted-foreground flex flex-col items-end justify-between gap-2">
            <div className="max-sm:hidden">
                Đã đăng vào {getFormatDistanceToNow(publishedAt)} -{' '}
                {getDateFormatted(publishedAt)}
            </div>
            <div className="sm:hidden">
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
                <button onClick={handleBookmark}>
                    {isBookmarked ? (
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
