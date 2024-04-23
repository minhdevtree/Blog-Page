import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';
import { Heart, MessageCircle, SquarePen, UserRoundPlus } from 'lucide-react';

export default function PostTime({
    publishedAt,
    commentsCount,
    likesCount,
}: {
    publishedAt: string;
    commentsCount: number;
    likesCount: number;
}) {
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
            </div>
        </div>
    );
}
