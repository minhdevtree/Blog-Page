import { getPosts, getPostsByAuthor, getPostsByCategory } from '@/lib/data';
import { SearchPostParams } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';
import { PostCard } from './post-card';

export default async function MyPosts({
    searchParams,
}: {
    searchParams: SearchPostParams;
}) {
    const { posts, pageMeta } = await getPostsByAuthor(searchParams);
    return (
        <div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
            <ListPagination meta={pageMeta} />
        </div>
    );
}
