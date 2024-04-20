import { getPostChildComments } from '@/lib/data';
import PostCommentCard from './post-comment-card';
import Link from 'next/link';

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
        { page: 1, pageSize: 5 }
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
            {pageMeta.hasNext && (
                <div className="text-center mt-5">
                    <Link href={`/p/${postId}?commentId=${parentId}`}>
                        <button className="text-sky-500">
                            Xem thêm bình luận
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
