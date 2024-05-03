'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PostComment } from '@/lib/define';
import CommentForm from './comment-form';
import Link from 'next/link';
import CommentText from '@/components/shared/comment-text';

export default function PostCommentReply({
    comment,
    session,
    postId,
}: {
    comment: PostComment;
    session: any;
    postId: string;
}) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="text-sm text-muted-foreground">
                        Trả lời
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-sky-500 text-left">
                            Phản hồi {comment.user.fullName} (@
                            {comment.user.username}):
                        </DialogTitle>
                        <div className="text-sm text-muted-foreground text-left">
                            <CommentText comment={comment.content} />
                        </div>
                    </DialogHeader>
                    {comment._count.children > 9 ? (
                        <Link
                            href={`/p/${postId}?commentId=${comment.id}`}
                            className="flex justify-center"
                        >
                            <Button
                                className="my-2 mx-auto"
                                variant="outline"
                                size="sm"
                            >
                                Xem tất cả {comment._count.children} phản hồi
                            </Button>
                        </Link>
                    ) : (
                        <CommentForm
                            parentId={comment.id}
                            session={session}
                            postId={postId}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
