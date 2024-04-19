import { getPostParentComments } from '@/lib/data';
import PostCommentCard from './post-comment-card';
import { PostComment } from '@/lib/define';

export default async function PostCommentList({ postId }: { postId: string }) {
    const comments = await getPostParentComments(postId);
    return (
        <div className="w-full">
            {comments.map(comment => (
                <PostCommentCard comment={comment} key={comment.id} />
            ))}
        </div>
    );
}
