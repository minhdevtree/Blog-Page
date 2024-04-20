import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PostComment } from '@/lib/define';
import { getFormatDistanceToNow } from '@/lib/utils';
import { HeartIcon } from '@radix-ui/react-icons';
import PostCommentLike from './post-comment-like';

export default async function PostCommentCard({
    comment,
    session,
}: {
    comment: PostComment;
    session: any;
}) {
    let isLiked = false;
    if (session?.user?.id) {
        isLiked =
            (await prisma.postCommentLike.findFirst({
                where: {
                    userId: session?.user?.id,
                    postCommentId: comment.id,
                },
            })) !== null;
    }

    return (
        <>
            <div className="flex items-start gap-2 md:gap-5 my-5">
                <Avatar className="border-solid border-sky-500 border-2 w-[45px] h-[45px]">
                    <AvatarImage
                        src={comment.user.img || '/avatar/noavatar.png'}
                        alt="avatar"
                    />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Card className="p-4 pb-2 w-full relative">
                    {comment._count.likes > 0 && (
                        <div className="absolute bottom-[-10px] right-[-10px]">
                            <Badge className="bg-sky-500 text-white flex gap-1 items-center">
                                <HeartIcon className="w-4 h-4" />
                                <span>{comment._count.likes}</span>
                            </Badge>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <p className="text-base font-bold leading-none text-sky-500">
                            {comment.user.fullName}
                        </p>
                        <p className="text-base leading-none text-muted-foreground">
                            @{comment.user.username}
                        </p>
                        <p className="text-base leading-none text-muted-foreground">
                            {getFormatDistanceToNow(comment.createdAt)}
                        </p>
                    </div>
                    <div className="mt-3">{comment.content}</div>
                    {session && (
                        <>
                            <Separator className="my-2" />
                            <div className="flex items-center gap-5">
                                <PostCommentLike
                                    session={session}
                                    commentId={comment.id}
                                    isLiked={isLiked}
                                />
                                <button className="text-sm text-muted-foreground">
                                    Trả lời
                                </button>
                            </div>
                        </>
                    )}
                </Card>
            </div>
            {comment._count.children > 0 && (
                <div className="ml-24 flex gap-2 h-[1.25rem]">
                    <Separator orientation="vertical" />
                    <button className="text-sm text-muted-foreground">
                        {comment._count.children} phản hồi
                    </button>
                </div>
            )}
        </>
    );
}
