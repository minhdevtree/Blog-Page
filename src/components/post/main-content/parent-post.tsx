'use client';

import { PostDetail } from '@/lib/define';
import PostMeta from './post-meta';
import parse from 'html-react-parser';
import { useEffect } from 'react';

export default function ParentPost({ post }: { post: PostDetail }) {
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
        <div className="mt-10 parent-post">
            <h1 className="text-3xl font-bold leading-none text-sky-500 my-5">
                {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-3">{post.summary}</p>
            <div className="mt-10">{parse(post?.content)}</div>
            {post?.metas?.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
