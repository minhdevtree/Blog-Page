import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function NewPostListLoading() {
    return (
        <Carousel className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
            <CarouselContent className="p-5 bg-card">
                <CarouselItem>
                    <div className="p-1">
                        <Card className="border-0">
                            <CardContent className="p-0 flex flex-col justify-center md:justify-between lg:flex-row sm:gap-8">
                                {/* Begin Image */}
                                <div className="w-full sm:w-full md:w-[400px] lg:w-[600px] xl:w-[700px]">
                                    <Skeleton className="h-full aspect-video" />
                                </div>
                                {/* End Image */}

                                <div className="flex flex-col justify-between">
                                    <div className="">
                                        <div>
                                            {/* Begin Category */}
                                            <div className="sm:flex gap-2 hidden">
                                                <Skeleton className="h-[1.25rem] w-[120px] rounded-lg" />
                                            </div>
                                            {/* End Category */}

                                            <div className="mb-2 mt-5">
                                                {/* Begin post title */}
                                                <h1 className="text-xl font-bold">
                                                    <Skeleton className="h-[1.75rem] w-[300px]" />
                                                </h1>
                                                {/* End post title */}
                                            </div>
                                            {/* Begin post summary */}
                                            <div className="text-sm text-muted-foreground line-clamp-6 md:max-w-[500px]">
                                                <div className="h-[1.25rem]">
                                                    <Skeleton className="h-[0.875rem] w-[450px]" />
                                                </div>
                                                <div className="h-[1.25rem]">
                                                    <Skeleton className="h-[0.875rem] w-[450px]" />
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
                                                <Skeleton className="h-[0.875rem] w-[120px]" />
                                            </div>
                                            {/* End publishedAt */}
                                        </div>
                                    </div>
                                    <div>
                                        {/* Begin tag */}
                                        <div className="flex gap-2 my-2">
                                            <Skeleton className="h-[1.25rem] w-[60px] rounded-lg" />
                                            <Skeleton className="h-[1.25rem] w-[60px] rounded-lg" />
                                        </div>
                                        {/* End tag */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
