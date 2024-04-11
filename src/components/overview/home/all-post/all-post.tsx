import { getPosts } from '@/lib/data';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Post } from '@/lib/define';

export default async function AllPost() {
    const { posts } = await getPosts({ page: 1, pageSize: 9 });
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 my-2">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="flex justify-center my-5">
                <Link href="/posts">
                    <Button variant="default">Xem tất cả</Button>
                </Link>
            </div>
        </>
    );
}
