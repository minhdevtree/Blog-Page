import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PostCommentCardLoading from './post-comment-card-loading';

export default function PostCommentListLoading() {
    return (
        <div className="w-full">
            {Array.from({ length: 3 }).map((_, index) => (
                <PostCommentCardLoading key={index} />
            ))}
        </div>
    );
}
