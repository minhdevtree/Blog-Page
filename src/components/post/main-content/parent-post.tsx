'use client';

import { PostDetail } from '@/lib/define';
import PostMeta from './post-meta';
import parse from 'html-react-parser';
import { useHighlight } from '@/components/shared/custom-hook';

export default function ParentPost({ post }: { post: PostDetail }) {
    const ref = useHighlight(post?.content);

    return (
        <div className="mt-10 parent-post">
            <h1 className="text-3xl font-bold text-sky-500 my-5">
                {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-3">{post.summary}</p>
            <div className="mt-10" ref={ref}>
                {parse(post?.content)}
            </div>
            {post?.metas?.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
