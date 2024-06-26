'use client';

import { PostDetail } from '@/lib/define';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Menu({ post }: { post: PostDetail }) {
    const handleClick = (event: any, id: string) => {
        event.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // offset by 100px
                behavior: 'smooth',
            });
        }
    };

    if (post.children.length === 0)
        return (
            <div className="text-center text-sm mt-5">
                Bài viết này không có mục lục
            </div>
        );

    return (
        <ScrollArea className="h-80 rounded-md border mt-5">
            <div className="p-4">
                {post.children.map(post => (
                    <Link href={`#${post.id}`} key={`link-${post.id}`}>
                        <div
                            className="text-sm"
                            onClick={event => handleClick(event, post.id)}
                        >
                            {post.order}. {post.title}
                        </div>
                        <Separator className="my-2" />
                    </Link>
                ))}
            </div>
        </ScrollArea>
    );
}
