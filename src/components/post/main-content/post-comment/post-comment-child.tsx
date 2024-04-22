import { PostComment } from '@/lib/define';
import { Suspense, useState } from 'react';
import PostCommentChildList from './post-comment-child-list';
import PostCommentListLoading from './loading/post-comment-list-loading';

export default function PostCommentChild({
    comment,
    postId,
    session,
}: {
    comment: PostComment;
    postId: string;
    session: any;
}) {
    return (
        <div className="ml-12 md:ml-24">
            <Suspense fallback={<PostCommentListLoading />}>
                <PostCommentChildList
                    postId={postId}
                    parentId={comment.id}
                    session={session}
                />
            </Suspense>
        </div>
    );
}
