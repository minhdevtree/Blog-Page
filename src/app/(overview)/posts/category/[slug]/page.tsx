import { BreadItem, SearchPostParams } from '@/lib/define';
import type { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/lib/prisma';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Suspense } from 'react';
import PostsLoading from '@/components/overview/posts/loading/posts-loading';
import PostsByCategory from '@/components/overview/posts/posts-by-category/post-by-category';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
    params,
    searchParams,
}: Props): Promise<Metadata> {
    const category = await prisma.category.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            title: true,
        },
    });

    return {
        title: category?.title || 'Category',
        description: `Các bài viết thuộc chủ đề ${category?.title}`,
    };
}

export default async function PostByCategoryPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: SearchPostParams;
}) {
    const category = await prisma.category.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            title: true,
            parent: {
                select: {
                    title: true,
                    slug: true,
                },
            },
        },
    });
    let breadItems = [] as BreadItem[];
    if (category?.parent?.title) {
        breadItems = [
            {
                title: 'Tất cả bài viết',
                url: '/posts',
            },
            {
                title: category?.parent.title,
                url: `/posts/category/${category.parent.slug}`,
            },
            {
                title: category?.title,
                url: '/posts/category',
            },
        ] as BreadItem[];
    } else {
        breadItems = [
            {
                title: 'Tất cả bài viết',
                url: '/posts',
            },
            {
                title: category?.title,
                url: '/posts/category',
            },
        ] as BreadItem[];
    }

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
                <PostsByCategory
                    searchParams={searchParams}
                    slug={params.slug}
                />
            </Suspense>
        </div>
    );
}
