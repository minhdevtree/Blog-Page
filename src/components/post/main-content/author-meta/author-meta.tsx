import Author from './author';
import PostTime from './post-time';
import { AuthorPostDetail } from '@/lib/define';

export default function AuthorMeta({
    author,
    publishedAt,
    commentsCount,
    likesCount,
    isBookmarked,
    postId,
}: {
    author: AuthorPostDetail;
    publishedAt: string;
    commentsCount: number;
    likesCount: number;
    isBookmarked: boolean;
    postId: string;
}) {
    return (
        <div className="flex justify-between mb-2 flex-col sm:flex-row gap-2">
            <Author author={author} />
            <PostTime
                publishedAt={publishedAt}
                commentsCount={commentsCount}
                likesCount={likesCount}
                isBookmarked={isBookmarked}
                postId={postId}
            />
        </div>
    );
}
