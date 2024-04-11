import { getPosts } from '@/lib/data';
import NewPostCarousel from './new-post-carousel';

export default async function NewPostList() {
    const posts = await getPosts(5, 'published_all', 'desc');
    return <NewPostCarousel posts={posts} />;
}
