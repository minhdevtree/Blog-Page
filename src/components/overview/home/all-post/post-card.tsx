import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Post } from '@/lib/define';
import { KeyType } from '@prisma/client';
import DistanceToNowToolTip from '@/components/shared/distance-to-now-tooltip';
import CategoryBadge from '@/components/shared/category-badge';
import TagBadge from '@/components/shared/tag-badge';
import PublishedBadge from '@/components/shared/published-badge';
import { BasicTooltip } from '@/components/shared/tool-tip';

export function PostCard({ post }: { post: Post }) {
    return (
        <Card className="p-5 bg-card">
            <CardContent className="p-0 flex flex-col justify-center sm:gap-2 relative">
                <div className="w-full ">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                        <Image
                            src={
                                post.metas.find(
                                    meta => meta.key === KeyType.IMG
                                )?.value || '/background/nobackground.png'
                            }
                            alt="Post Image"
                            fill
                            className="rounded-md object-cover"
                        />
                    </AspectRatio>
                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="hidden"
                                    className="absolute top-[0.1rem] right-[0.1rem]"
                                >
                                    <BookmarkIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="z-50">
                                <p>Lưu</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                </div>
                <div className="flex flex-col justify-between">
                    <div className="">
                        <div>
                            <div className=" hidden sm:flex justify-between">
                                <div className="flex gap-2">
                                    {post.categories.map((category, index) => (
                                        <CategoryBadge
                                            key={index}
                                            title={category.title}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-2 mt-5">
                                <h1 className="text-xl font-bold line-clamp-1">
                                    <BasicTooltip title={post.title} />
                                </h1>
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-3 ">
                                {post.summary}
                                <br />
                                {post.content}
                            </div>
                        </div>
                        <Separator className="my-5" />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="border-2 border-sky-500">
                                    <AvatarImage
                                        src={post.author.img}
                                        alt="Avatar Image"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="text-sm text-muted-foreground">
                                    <div>{post.author.fullName}</div>
                                    <div>{post.author.username}</div>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground flex flex-col justify-center">
                                <DistanceToNowToolTip date={post.publishedAt} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between lg:hidden gap-2">
                        <div className="flex gap-2 my-2">
                            {post.tags.map((tag, index) => (
                                <TagBadge key={index} title={tag.title} />
                            ))}
                        </div>
                        <div className="flex gap-2 my-2">
                            <PublishedBadge status={post.published} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
