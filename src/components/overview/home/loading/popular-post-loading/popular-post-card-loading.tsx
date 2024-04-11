import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function PopularPostCardLoading() {
    return (
        <Card className="p-5 bg-card">
            <CardContent className="p-0 flex flex-col justify-center gap-8 ">
                <div className="flex flex-col justify-between">
                    <div className="">
                        <div>
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    <Skeleton className="h-[1.25rem] w-[60px] rounded-lg" />
                                    <Skeleton className="h-[1.25rem] w-[50px] rounded-lg" />
                                </div>
                            </div>

                            <div className="mb-2 mt-5">
                                <h1 className="text-xl font-bold line-clamp-1">
                                    <Skeleton className="h-[1.75rem] w-[150px]" />
                                </h1>
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-2 ">
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-full" />
                                </div>
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-full" />
                                </div>
                                <div className="h-[1.25rem]">
                                    <Skeleton className="h-[0.875rem] w-[80%]" />
                                </div>
                            </div>
                        </div>
                        <Separator className="my-5" />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-muted-foreground">
                                    <Skeleton className="h-[0.875rem] w-[100px]" />
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground flex flex-col justify-center">
                                <Skeleton className="h-[0.875rem] w-[50px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
