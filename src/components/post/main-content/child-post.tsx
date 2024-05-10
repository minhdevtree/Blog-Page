'use client';

import { ChildPostDetail } from '@/lib/define';
import PostMeta from './post-meta';
import parse from 'html-react-parser';
import { useHighlight } from '@/components/shared/custom-hook';

export default function ChildPost({ post }: { post: ChildPostDetail }) {
    const ref = useHighlight(post?.content);

    return (
        <div className="mt-10 child-post">
            <h1
                className="text-xl font-bold leading-none text-sky-500 my-5"
                id={post.id}
            >
                {`${post?.order}. ${post?.title}`}
            </h1>
            <div className="mt-2" ref={ref}>
                {parse(post?.content)}
            </div>
            {post?.metas.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
