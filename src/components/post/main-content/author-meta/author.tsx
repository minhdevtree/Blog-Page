import ButtonFollowUser from '@/components/shared/button-follow-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthorPostDetail } from '@/lib/define';
import { SquarePen, UserRoundPlus } from 'lucide-react';

export default function Author({
    author,
    isFollowed,
}: {
    author: AuthorPostDetail;
    isFollowed: boolean;
}) {
    return (
        <div className="flex gap-2">
            <Avatar className="border-solid border-sky-500 border-2 w-[35px] h-[35px] md:w-[45px] md:h-[45px]">
                <AvatarImage
                    src={author?.img || '/avatar/noavatar.png'}
                    alt="avatar"
                />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex">
                <div className="flex flex-col justify-between">
                    <div className="flex gap-2 items-center">
                        <p className="text-base font-bold leading-none text-sky-500">
                            {author?.fullName}
                        </p>
                        <p className="text-base leading-none text-muted-foreground max-lg:hidden">
                            @{author?.username}
                        </p>
                        <ButtonFollowUser
                            isFollowed={isFollowed}
                            userId={author.id}
                        />
                    </div>
                    <div className="flex justify-start gap-3 text-base leading-none text-muted-foreground">
                        <div className="flex gap-1 items-center">
                            <UserRoundPlus className="w-3 h-3" />
                            <span>{author?._count?.followers}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <SquarePen className="w-3 h-3" />
                            <span>{author?._count?.posts}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
