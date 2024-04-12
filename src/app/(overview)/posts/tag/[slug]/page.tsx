import { BreadItem, SearchPostParams } from '@/lib/define';
import type { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/lib/prisma';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Suspense } from 'react';
import PostsLoading from '@/components/overview/posts/loading/posts-loading';
import PostsByTag from '@/components/overview/posts/posts-by-tag/posts-by-tag';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
    params,
    searchParams,
}: Props): Promise<Metadata> {
    const tag = await prisma.tag.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            title: true,
        },
    });

    return {
        title: '#' + tag?.title || 'Tag',
        description: `Các bài viết thuộc tag ${tag?.title}`,
    };
}

export default async function PostByCategoryPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: SearchPostParams;
}) {
    const tag = await prisma.tag.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            title: true,
        },
    });
    const breadItems = [
        {
            title: 'Tất cả bài viết',
            url: '/posts',
        },
        {
            title: '#' + tag?.title,
            url: '/posts/tag',
        },
    ] as BreadItem[];

    return (
        <div>
            <BreadcrumbComponent breadcrumbs={breadItems} />
            <Suspense
                key={
                    searchParams.page ||
                    '1' + searchParams.sort + searchParams.pageSize
                }
                fallback={<PostsLoading />}
            >
                <PostsByTag searchParams={searchParams} slug={params.slug} />
            </Suspense>
        </div>
    );
}
