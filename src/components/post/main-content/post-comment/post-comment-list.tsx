import { getPostParentComments } from '@/lib/data';
import PostCommentCard from './post-comment-card';
import { PostComment, SearchCommentParams } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';

export default async function PostCommentList({
    postId,
    searchParams,
    session,
}: {
    postId: string;
    searchParams: SearchCommentParams;
    session: any;
}) {
    const { comments, pageMeta } = await getPostParentComments(
        postId,
        searchParams
    );
    return (
        <div className="w-full">
            {comments.map(comment => (
                <PostCommentCard
                    comment={comment}
                    key={comment.id}
                    session={session}
                />
            ))}
            <ListPagination meta={pageMeta} scroll={false} />
        </div>
    );
}
