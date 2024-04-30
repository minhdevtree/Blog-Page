'use client';

import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
export default function CommentText({ comment }: { comment: string }) {
    const [isShowMore, setIsShowMore] = useState(false);
    return (
        <>
            <div className="whitespace-pre-wrap">
                {comment.length > 150 && !isShowMore
                    ? `${comment.slice(0, 150)}...`
                    : comment}
                {comment.length > 150 && (
                    <Badge
                        className="cursor-pointer font-normal ml-2"
                        variant="outline"
                        onClick={() => setIsShowMore(!isShowMore)}
                    >
                        {isShowMore ? 'Ẩn bớt' : 'Xem thêm'}
                    </Badge>
                )}
            </div>
        </>
    );
}
