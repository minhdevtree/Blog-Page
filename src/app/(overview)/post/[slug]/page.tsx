import TagSectionLoading from '@/components/overview/home/loading/tag-loading/tag-section-loading';
import TagSection from '@/components/overview/home/tag/tag';
import MainContent from '@/components/post/main-content/main-content';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Card } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getPostDetail } from '@/lib/data';
import { BreadItem } from '@/lib/define';
import { Metadata } from 'next';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

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
        title: post?.title || 'Bài đăng',
        description: `Bài đăng với nội dung: ${post?.title}`,
    };
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostDetail(params.slug);

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

    const session = await auth();
    const isLiked =
        (await prisma.like.findFirst({
            where: {
                userId: session?.user?.id,
                postId: post.id,
            },
        })) !== null;
    return (
        <Card className="w-full px-5 py-10">
            <div className="grid grid-cols-4 max-lg:grid-cols-3 gap-5">
                <div className="col-span-3">
                    <BreadcrumbComponent breadcrumbs={breadItems} />
                    <MainContent
                        post={post}
                        userId={session?.user?.id || ''}
                        isLiked={isLiked}
                    />
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
                            <span className={`text-2xl font-bold`}>
                                Mục lục
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
