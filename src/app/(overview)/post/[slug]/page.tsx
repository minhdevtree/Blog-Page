import TagSectionLoading from '@/components/overview/home/loading/tag-loading/tag-section-loading';
import TagSection from '@/components/overview/home/tag/tag';
import MainContent from '@/components/post/main-content/main-content';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Card } from '@/components/ui/card';
import {
    getPostDetail,
    isBookmarkedPost,
    isFollowedUser,
    isLikedPost,
} from '@/lib/data';
import { BreadItem, SearchCommentParams } from '@/lib/define';
import { Metadata } from 'next';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import Menu from '@/components/post/menu/menu';
import PostComment from '@/components/post/main-content/post-comment/post-comment';
import PostNotFound from '@/components/post/post-not-found';
import PostError from '@/components/post/post-error';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export const maxDuration = 300;

export async function generateMetadata({
    params,
    searchParams,
}: Props): Promise<Metadata> {
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            title: true,
        },
    });

    return {
        title: post?.title || 'Không tìm thấy bài viết',
        description: post?.title
            ? `Bài đăng với nội dung: ${post?.title}`
            : 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    };
}

export default async function PostPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: SearchCommentParams;
}) {
    const post = await getPostDetail(params.slug);

    if (post?.error) {
        return <PostError error={post.error} />;
    }

    if (!post) {
        return <PostNotFound />;
    }

    const breadItems = [
        {
            title: 'Tất cả bài viết',
            url: '/posts',
        },
        {
            title: post.title,
            url: `/post}`,
        },
    ] as BreadItem[];

    const isLiked = await isLikedPost(post.id);

    const isBookmarked = await isBookmarkedPost(post.id);

    const isFollowed = await isFollowedUser(post.author.id);

    return (
        <Card className="px-5 py-10 post-detail">
            <div className="grid grid-cols-4 max-lg:grid-cols-3 gap-5">
                <div className="col-span-3">
                    <BreadcrumbComponent breadcrumbs={breadItems} />
                    <MainContent
                        post={post}
                        isLiked={isLiked}
                        isBookmarked={isBookmarked}
                        isFollowed={isFollowed}
                    />

                    <PostComment postId={post.id} searchParams={searchParams} />
                </div>

                <div className="col-span-1 grid grid-cols-1 gap-2 max-lg:hidden">
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className={`text-2xl font-bold`}>
                                Xu hướng
                            </span>
                            <Suspense fallback={<TagSectionLoading />}>
                                <TagSection />
                            </Suspense>
                        </div>
                        <div className="sticky top-14">
                            <span className="text-2xl font-bold">Mục lục</span>
                            <Menu post={post} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
