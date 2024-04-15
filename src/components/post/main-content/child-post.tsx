import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChildPostDetail, PostDetail } from '@/lib/define';
import Image from 'next/image';
import PostMeta from './post-meta';

export default function ChildPost({ post }: { post: ChildPostDetail }) {
    return (
        <div className="mt-10">
            <h1 className="text-xl font-bold leading-none text-sky-500 my-5">
                {`${post.order}. ${post.title}`}
            </h1>
            <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            {post.metas.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
