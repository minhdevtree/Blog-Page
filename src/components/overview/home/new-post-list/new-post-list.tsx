import { getPosts } from '@/lib/data';
import NewPostCarousel from './new-post-carousel';

export default async function NewPostList() {
    const { posts } = await getPosts({ page: 1, pageSize: 9 });
    return <NewPostCarousel posts={posts} />;
}
