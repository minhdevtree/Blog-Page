import { Textarea } from '@/components/ui/textarea';
import CommentForm from './comment-form';
import { auth } from '@/lib/auth';
import PostCommentList from './post-comment-list';

export default async function PostComment({ postId }: { postId: string }) {
    const session = await auth();
    return (
        <div className="my-16" id="post-comment">
            <span className={`text-2xl font-bold`}>Bình luận</span>
            <CommentForm session={session} postId={postId} />
            <PostCommentList postId={postId} />
        </div>
    );
}
