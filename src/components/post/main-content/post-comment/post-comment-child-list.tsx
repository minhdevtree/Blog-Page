import { getPostChildComments } from '@/lib/data';
import PostCommentCard from './post-comment-card';

export default async function PostCommentChildList({
    postId,
    parentId,
    session,
}: {
    postId: string;
    parentId: string;
    session: any;
}) {
    const { comments, pageMeta } = await getPostChildComments(
        postId,
        parentId,
        { page: 1, pageSize: 9 }
    );
    return (
        <div className="w-full">
            {comments.map(comment => (
                <PostCommentCard
                    comment={comment}
                    key={comment.id}
                    session={session}
                    postId={postId}
                    child={true}
                />
            ))}
        </div>
    );
}
