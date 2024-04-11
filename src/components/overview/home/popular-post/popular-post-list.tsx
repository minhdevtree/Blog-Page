import { getPopularPosts } from '@/lib/data';
import { PopularPostCard } from './popular-post-card';

export default async function PopularPostList() {
    const posts = await getPopularPosts();

    return (
        <div className="grid grid-cols-1 gap-2 my-2">
            {posts.map(post => (
                <PopularPostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
