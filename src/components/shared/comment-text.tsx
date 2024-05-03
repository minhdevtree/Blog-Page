'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import parse from 'html-react-parser';

export default function CommentText({ comment }: { comment: string }) {
    const [isShowMore, setIsShowMore] = useState(false);
    const [displayedText, setDisplayedText] = useState<string>('');

    // Function to toggle show more/show less
    const toggleShowMore = () => {
        setIsShowMore(!isShowMore);
    };

    // Set displayed text based on show more/show less state
    const setDisplayText = () => {
        if (isShowMore) {
            setDisplayedText(comment);
        } else {
            if (comment.length <= 150) {
                setDisplayedText(comment);
            } else {
                setDisplayedText(comment.slice(0, 150) + '...');
            }
        }
    };

    // const highlightCodeblocks = (content: any) => {
    //     const doc = new DOMParser().parseFromString(content, 'text/html');
    //     const hljs = require('highlight.js');
    //     hljs.initHighlightingOnLoad();
    //     doc.querySelectorAll('pre code').forEach(el => {
    //         if (!(el as HTMLElement).dataset.highlighted) {
    //             hljs.highlightElement(el);
    //         }
    //     });
    // };

    React.useEffect(() => {
        setDisplayText();
    }, [comment, isShowMore]);

    // React.useEffect(() => {
    //     highlightCodeblocks(comment);
    // }, [comment]);

    return (
        <>
            <div className="break-words whitespace-pre-wrap">
                {parse(displayedText)}
            </div>
            {comment.length > 150 && (
                <Badge
                    className="cursor-pointer font-normal"
                    variant="outline"
                    onClick={toggleShowMore}
                >
                    {isShowMore ? 'Ẩn bớt' : 'Xem thêm'}
                </Badge>
            )}
        </>
    );
}
