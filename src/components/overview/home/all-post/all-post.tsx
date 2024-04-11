import { getPosts } from '@/lib/data';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';

export default async function AllPost() {
    const posts = await getPosts(9, 'published_all', 'desc');
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 my-2">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="flex justify-center my-5">
                <Button variant="default">Xem thêm</Button>
            </div>
        </>
    );
}
