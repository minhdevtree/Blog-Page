import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Post } from '@/lib/define';
import DistanceToNowToolTip from '@/components/shared/distance-to-now-tooltip';
import CategoryBadge from '@/components/shared/category-badge';
import TagBadge from '@/components/shared/tag-badge';
import PublishedBadge from '@/components/shared/published-badge';
import { BasicTooltip } from '@/components/shared/tool-tip';
import Link from 'next/link';

export function PopularPostCard({ post }: { post: Post }) {
    return (
        <Card className="p-5 bg-card relative">
            <CardContent className="p-0 flex flex-col justify-center gap-8 ">
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
                <div className="flex flex-col justify-between">
                    <div className="">
                        <Link href={`/post/${post.slug}`}>
                            <div>
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        {post.categories.map(
                                            (category, index) => (
                                                <CategoryBadge
                                                    key={index}
                                                    title={category.title}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mb-2 mt-5">
                                    <h1 className="text-xl font-bold line-clamp-1">
                                        <BasicTooltip title={post.title} />
                                    </h1>
                                </div>
                                <div className="text-sm text-muted-foreground line-clamp-2 ">
                                    {post.summary}
                                    <br />
                                    {/* {post.content} */}
                                </div>
                            </div>
                        </Link>
                        <Separator className="my-5" />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-muted-foreground">
                                    <span>{post.author.username}</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground flex flex-col justify-center">
                                <DistanceToNowToolTip date={post.publishedAt} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
