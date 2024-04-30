import PostCommentCard from '@/components/post/main-content/post-comment/post-comment-card';
import ListPagination from '@/components/shared/list-pagination';
import { auth } from '@/lib/auth';
import { getPostChildComments } from '@/lib/data';
import { SearchCommentParams } from '@/lib/define';

export default async function CommentChildList({
    postId,
    parentId,
    searchParams,
    session,
}: {
    postId: string;
    parentId: string;
    searchParams: SearchCommentParams;
    session: any;
}) {
    const { comments, pageMeta } = await getPostChildComments(
        postId,
        parentId,
        searchParams
    );
    return (
        <div>
            {comments.map(comment => (
                <PostCommentCard
                    comment={comment}
                    key={comment.id}
                    postId={postId}
                    child={true}
                    session={session}
                />
            ))}
            <ListPagination meta={pageMeta} scroll={true} />
        </div>
    );
}
