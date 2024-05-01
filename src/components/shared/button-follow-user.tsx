'use client';

import { handleFollowUser } from '@/lib/action';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ButtonFollowUser({
    isFollowed,
    userId,
}: {
    isFollowed: boolean;
    userId: string;
}) {
    const [isClicked, setIsClicked] = useState(false);
    const [isFollow, setIsFollow] = useState(isFollowed);
    const handleFollow = async () => {
        setIsClicked(true);
        const result = await handleFollowUser(userId);
        if (result.isSuccess) {
            toast.success(result.message);
            setIsFollow(!isFollow);
            setTimeout(() => setIsClicked(false), 500);
        } else {
            toast.error(result.message || 'Đã có lỗi xảy ra');
        }
    };
    return (
        <button
            onClick={handleFollow}
            className={`px-2.5 text-xs cursor-pointer border-sky-500 border rounded-sm transition-all duration-500 ease-in-out transform ${
                isClicked
                    ? 'scale-90 text-white bg-sky-500 bg-gradient-to-r from-blue-500 to-purple-500 font-semibold'
                    : ''
            } ${
                isFollow
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white'
                    : ''
            }`}
        >
            <span>{isFollow ? 'Đang theo dõi' : 'Theo dõi'}</span>
        </button>
    );
}
