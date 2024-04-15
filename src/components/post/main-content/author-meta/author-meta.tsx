import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, SquarePen, UserRoundPlus } from 'lucide-react';
import Author from './author';
import PostTime from './post-time';
import { AuthorPostDetail } from '@/lib/define';

export default function AuthorMeta({
    author,
    publishedAt,
    commentsCount,
    likesCount,
}: {
    author: AuthorPostDetail;
    publishedAt: string;
    commentsCount: number;
    likesCount: number;
}) {
    return (
        <div className="flex justify-between mb-2 flex-col sm:flex-row gap-2">
            <Author author={author} />
            <PostTime
                publishedAt={publishedAt}
                commentsCount={commentsCount}
                likesCount={likesCount}
            />
        </div>
    );
}
