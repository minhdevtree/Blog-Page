import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Post } from '@/lib/define';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardLoading() {
    return (
        <Card className="p-5 bg-card my-3">
            <CardContent className="p-0 grid md:grid-cols-2 xl:grid-cols-5 gap-5">
                <div className="md:col-span-1 xl:col-span-2">
                    <Skeleton className="aspect-video" />
                </div>
                <div className="md:col-span-1 xl:col-span-3 flex flex-col justify-between">
                    <div className="">
                        <div>
                            {/* Begin Category */}
                            <div className="sm:flex gap-2 hidden">
                                <Skeleton className="h-[1.25rem] w-[120px] rounded-lg" />
                            </div>
                            {/* End Category */}
                            <div className="mb-2 mt-5">
                                {/* Begin post title */}
                                <h1 className="text-xl font-bold line-clamp-1">
                                    <Skeleton className="h-[1.75rem] w-[300px]" />
                                </h1>
                                {/* End post title */}
                            </div>
                            {/* Begin post summary */}
                            <div className="text-sm text-muted-foreground">
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-full" />
                                </div>
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-full" />
                                </div>
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-[300px]" />
                                </div>
                            </div>
                            {/* End post summary */}
                        </div>
                        <Separator className="my-5" />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                {/* Avatar Here */}
                                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                                <div className="text-sm text-muted-foreground flex flex-col gap-2">
                                    <div className="h-1.25rem">
                                        <Skeleton className="h-[0.875rem] w-[100px]" />
                                    </div>
                                    <div className="h-1.25rem">
                                        <Skeleton className="h-[0.875rem] w-[80px]" />
                                    </div>
                                </div>
                            </div>
                            {/* Begin publishedAt */}
                            <div className="text-sm text-muted-foreground ">
                                <Skeleton className="h-[0.875rem] w-[100px]" />
                            </div>
                            {/* End publishedAt */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
