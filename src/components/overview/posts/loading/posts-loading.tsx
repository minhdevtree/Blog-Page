import { PageMeta } from '@/lib/define';
import { PostCardLoading } from './posts-card-loading';
import ListPagination from '@/components/shared/list-pagination';

const pageMetaDefault = {
    totalPages: 1,
    page: 1,
    pageSize: 1,
    hasNext: false,
    hasPrev: false,
} as PageMeta;

export default function PostsLoading() {
    return (
        <div>
            <PostCardLoading />
            <PostCardLoading />
            <PostCardLoading />
            <ListPagination meta={pageMetaDefault} />
        </div>
    );
}
