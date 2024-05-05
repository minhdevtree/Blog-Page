'use client';

import { ChildPostDetail } from '@/lib/define';
import PostMeta from './post-meta';
import parse from 'html-react-parser';
import { useEffect } from 'react';

export default function ChildPost({ post }: { post: ChildPostDetail }) {
    const highlightCodeblocks = (content: any) => {
        const doc = new DOMParser().parseFromString(content, 'text/html');
        const hljs = require('highlight.js');
        hljs.initHighlightingOnLoad();
        doc.querySelectorAll('pre code').forEach(el => {
            if (!(el as HTMLElement).dataset.highlighted) {
                hljs.highlightElement(el);
            }
        });
    };

    useEffect(() => {
        highlightCodeblocks(post?.content);
    }, [post?.id]);
    return (
        <div className="mt-10 child-post">
            <h1
                className="text-xl font-bold leading-none text-sky-500 my-5"
                id={post.id}
            >
                {`${post?.order}. ${post?.title}`}
            </h1>
            <div className="mt-2">{parse(post?.content)}</div>
            {post?.metas.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
