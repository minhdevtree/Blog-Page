import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { PostComment } from '@/lib/define';
import { getFormatDistanceToNow } from '@/lib/utils';

export default function PostCommentCard({ comment }: { comment: PostComment }) {
    return (
        <div className="flex items-start gap-5 my-5">
            <Avatar className="border-solid border-sky-500 border-2 w-[45px] h-[45px]">
                <AvatarImage
                    src={comment.user.img || '/avatar/noavatar.png'}
                    alt="avatar"
                />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Card className="p-4 w-full">
                <div className="flex gap-2">
                    <p className="text-base font-bold leading-none text-sky-500">
                        {comment.user.username}
                    </p>
                    <p className="text-base leading-none text-muted-foreground">
                        @{comment.user.username}
                    </p>
                    <p className="text-base leading-none text-muted-foreground">
                        {getFormatDistanceToNow(comment.createdAt)}
                    </p>
                </div>
                <div className="mt-3">{comment.content}</div>
            </Card>
        </div>
    );
}
