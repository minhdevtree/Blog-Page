'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

export const useHighlight = (content: string) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            (ref.current as HTMLElement)
                .querySelectorAll('pre code')
                .forEach((block: any) => {
                    if (!block.dataset.highlighted) {
                        hljs.highlightElement(block);
                        block.dataset.highlighted = 'true';
                    }
                });
        }
    }, [content]);

    return ref;
};
