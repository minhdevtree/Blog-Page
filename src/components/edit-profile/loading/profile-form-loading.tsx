import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileFormLoading() {
    return (
        <>
            <div className="flex items-start gap-3">
                <Skeleton className="h-[100px] w-[100px] rounded-full" />
                <div className="text-sm text-muted-foreground flex flex-col gap-2 mt-2">
                    <div className="h-1.5rem">
                        <Skeleton className="h-[0.875rem] w-[150px]" />
                    </div>
                    <div className="h-1.25rem">
                        <Skeleton className="h-[0.875rem] w-[80px]" />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[300px]" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[240px]" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[300px]" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[230px]" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-[80px] w-full" />
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[0.875rem] w-[230px]" />
                </div>
                <div className="text-sm font-medium leading-none">
                    <Skeleton className="h-[0.875rem] w-[150px]" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-[100px]" />
            </div>
        </>
    );
}
