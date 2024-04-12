import { getPostsByTag } from '@/lib/data';
import { SearchPostParams } from '@/lib/define';
import { PostCard } from '../post-card';
import ListPagination from '@/components/shared/list-pagination';

export default async function PostsByTag({
    slug,
    searchParams,
}: {
    slug: string;
    searchParams: SearchPostParams;
}) {
    const { posts, pageMeta } = await getPostsByTag(slug, searchParams);
    return (
        <div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
            <ListPagination meta={pageMeta} />
        </div>
    );
}
