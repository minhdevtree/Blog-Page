import PostsLoading from '@/components/overview/posts/loading/posts-loading';
import Posts from '@/components/overview/posts/posts';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import { BreadItem, SearchPostParams } from '@/lib/define';
import { Suspense } from 'react';

const breadItems = [
    {
        title: 'Tất cả bài viết',
        url: '/posts',
    },
] as BreadItem[];

export default function PostsPage({
    searchParams,
}: {
    searchParams: SearchPostParams;
}) {
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
                <Posts searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
