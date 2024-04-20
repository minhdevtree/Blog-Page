import { Textarea } from '@/components/ui/textarea';
import CommentForm from './comment-form';
import { auth } from '@/lib/auth';
import PostCommentList from './post-comment-list';
import { SearchCommentParams } from '@/lib/define';
import { Suspense } from 'react';
import PostCommentListLoading from './loading/post-comment-list-loading';

export default async function PostComment({
    postId,
    searchParams,
}: {
    postId: string;
    searchParams: SearchCommentParams;
}) {
    const session = await auth();
    return (
        <div className="my-16" id="post-comment">
            <span className={`text-2xl font-bold`}>Bình luận</span>
            <CommentForm session={session} postId={postId} />
            <Suspense
                key={searchParams.page || '1' + searchParams.pageSize}
                fallback={<PostCommentListLoading />}
            >
                <PostCommentList
                    postId={postId}
                    searchParams={searchParams}
                    session={session}
                />
            </Suspense>
        </div>
    );
}
