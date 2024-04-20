import CommentChildList from '@/components/overview/p/comment-child-list';
import PostsLoading from '@/components/overview/posts/loading/posts-loading';
import Posts from '@/components/overview/posts/posts';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { getPostChildComments } from '@/lib/data';
import { BreadItem, SearchCommentParams, SearchPostParams } from '@/lib/define';
import { Metadata } from 'next';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import PostCommentListLoading from '@/components/post/main-content/post-comment/loading/post-comment-list-loading';
import { auth } from '@/lib/auth';
import CommentOrigin from '@/components/overview/p/comment-origin';
import PostCommentCardLoading from '@/components/post/main-content/post-comment/loading/post-comment-card-loading';

export const metadata: Metadata = {
    title: 'Trả lời bình luận',
    description: 'Trả lời bình luận của bình luận khác trong bài viết.',
};

export default async function PostsPage({
    params,
    searchParams,
}: {
    params: { postId: string };
    searchParams: { page: string; commentId: string; pageSize: string };
}) {
    const searchCommentParams = {
        page: parseInt(searchParams.page) || 1,
        pageSize: parseInt(searchParams.pageSize) || 5,
    } as SearchCommentParams;

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
        },
        select: {
            title: true,
            slug: true,
        },
    });

    const breadItems = [
        {
            title: post?.title || 'Bài viết',
            url: `/post/${post?.slug}`,
        },
        {
            title: 'Phản hồi bình luận',
            url: `/p/${params.postId}`,
        },
    ] as BreadItem[];

    const session = await auth();

    return (
        <div>
            <BreadcrumbComponent breadcrumbs={breadItems} />
            <div className="mt-2">Bình luận gốc:</div>
            <Suspense fallback={<PostCommentCardLoading />}>
                <CommentOrigin
                    commentId={searchParams.commentId}
                    postId={params.postId}
                    session={session}
                />
            </Suspense>
            <div>Phản hồi:</div>
            <Suspense
                key={
                    searchParams.page ||
                    '1' + searchParams.commentId + searchParams.pageSize
                }
                fallback={<PostCommentListLoading />}
            >
                <CommentChildList
                    postId={params.postId}
                    parentId={searchParams.commentId}
                    searchParams={searchCommentParams}
                    session={session}
                />
            </Suspense>
        </div>
    );
}
