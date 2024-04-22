import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostCommentCardLoading() {
    return (
        <div className="flex items-start gap-5 my-5">
            <Skeleton className=" border-solid border-sky-500 border-2 w-[35px] h-[35px] md:w-[45px] md:h-[45px] rounded-full" />
            <Card className="p-4 w-full">
                <div className="flex gap-2">
                    <div className="text-base font-bold leading-none text-sky-500">
                        <Skeleton className="h-[0.875rem] w-[100px]" />
                    </div>
                    <div className="text-base leading-none text-muted-foreground">
                        <Skeleton className="h-[0.875rem] w-[80px]" />
                    </div>
                    <div className="text-base leading-none text-muted-foreground">
                        <Skeleton className="h-[0.875rem] w-[80px]" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="h-[1.25rem]">
                        <Skeleton className="h-[1rem] w-[100%]" />
                    </div>
                    <div className="h-[1.25rem]">
                        <Skeleton className="h-[1rem] w-[70%]" />
                    </div>
                </div>
            </Card>
        </div>
    );
}
