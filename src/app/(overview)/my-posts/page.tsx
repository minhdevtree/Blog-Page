import {
    BreadItem,
    FilterOption,
    SearchPostParams,
    SortOption,
} from '@/lib/define';
import type { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/lib/prisma';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { Suspense } from 'react';
import PostsLoading from '@/components/overview/posts/loading/posts-loading';
import PostsByCategory from '@/components/overview/posts/posts-by-category/post-by-category';
import MyPosts from '@/components/overview/posts/my-posts/my-posts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import SortSelect from '@/components/shared/sort-select';
import FilterSelect from '@/components/shared/filter-select';
import { PublishedType } from '@prisma/client';

export const metadata: Metadata = {
    title: 'Bài viết của tôi',
    description: 'Tất cả bài viết của tôi',
};

const selectOptions = [
    {
        label: 'Mới nhất',
        value: 'desc',
        field: 'sort',
    },
    {
        label: 'Cũ nhất',
        value: 'asc',
        field: 'sort',
    },
] as SortOption[];

const filterOptions = [
    {
        label: 'Nháp',
        value: PublishedType.DRAFT,
        field: PublishedType.DRAFT,
    },
    {
        label: 'Riêng tư',
        value: PublishedType.PRIVATE,
        field: PublishedType.PRIVATE,
    },
    {
        label: 'Dành cho người đăng ký',
        value: PublishedType.PUBLISHED_SUBSCRIBERS,
        field: PublishedType.PUBLISHED_SUBSCRIBERS,
    },
    {
        label: 'Công khai',
        value: PublishedType.PUBLISHED_ALL,
        field: PublishedType.PUBLISHED_ALL,
    },
] as FilterOption[];

export default async function MyPostPage({
    searchParams,
}: {
    searchParams: SearchPostParams;
}) {
    let breadItems = [] as BreadItem[];
    breadItems = [
        {
            title: 'Tất cả bài viết',
            url: '/posts',
        },
        {
            title: 'Bài viết của tôi',
            url: '/posts/my-post',
        },
    ] as BreadItem[];

    return (
        <div>
            <BreadcrumbComponent breadcrumbs={breadItems} />
            <div className="flex justify-between my-3">
                <div className="flex gap-2">
                    <SortSelect options={selectOptions} url="/my-posts" />
                    <FilterSelect
                        options={filterOptions}
                        url="/my-posts"
                        field="published"
                    />
                </div>
                <Button variant="default" asChild>
                    <Link href="/create-post">
                        <Plus className="w-4 h-4 mr-2" />
                        Viết bài mới
                    </Link>
                </Button>
            </div>

            <Suspense
                key={
                    searchParams.page ||
                    '1' + searchParams.sort + searchParams.pageSize
                }
                fallback={<PostsLoading />}
            >
                <MyPosts searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
