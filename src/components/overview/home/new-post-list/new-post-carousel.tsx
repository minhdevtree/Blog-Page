'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { NewPostCard } from './new-post-card';
import { Post } from '@/lib/define';

export default function NewPostCarousel({ posts }: { posts: Post[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {posts.map((post, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <NewPostCard post={post} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="max-md:hidden" />
            <CarouselNext className="max-md:hidden" />
        </Carousel>
    );
}
