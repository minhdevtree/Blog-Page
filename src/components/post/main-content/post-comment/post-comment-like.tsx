'use client';

import { handleLikeComment } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PostCommentLike({
    session,
    commentId,
    isLiked,
}: {
    session: any;
    commentId: string;
    isLiked: boolean;
}) {
    const router = useRouter();
    const handleLike = async () => {
        if (!session) {
            router.push('/login');
        } else {
            const result = await handleLikeComment(commentId, session.user.id);
            if (result.isSuccess) {
                toast.success(result.message);
            } else {
                toast.error(result.error || 'Đã có lỗi xảy ra');
            }
            router.refresh();
        }
    };
    if (isLiked) {
        return (
            <button className="text-sm text-sky-500" onClick={handleLike}>
                Đã thích
            </button>
        );
    }
    return (
        <button className="text-sm text-muted-foreground" onClick={handleLike}>
            Thích
        </button>
    );
}
