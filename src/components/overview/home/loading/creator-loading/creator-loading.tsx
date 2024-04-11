import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CreatorLoading() {
    return (
        <Card className="p-10 bg-auth">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5">
                <div className="col-span-1 flex flex-col justify-center gap-3">
                    <div className="font-bold text-3xl mx-auto">
                        <Skeleton className="h-[1.875rem] w-[200px]" />
                    </div>
                    <span className="text-sm mx-auto">
                        <Skeleton className="h-[0.875rem] w-[250px]" />
                    </span>
                </div>
                <div className="lg:col-span-2 flex w-full justify-between">
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <Skeleton className="md:h-[60px] md:w-[60px] xl:h-[80px] xl:w-[80px] rounded-full" />
                        </div>

                        <div className="text-base mx-auto ">
                            <Skeleton className="h-[1rem] w-[120px]" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <Skeleton className="md:h-[60px] md:w-[60px] xl:h-[80px] xl:w-[80px] rounded-full" />
                        </div>

                        <div className="text-base mx-auto ">
                            <Skeleton className="h-[1rem] w-[120px]" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <Skeleton className="md:h-[60px] md:w-[60px] xl:h-[80px] xl:w-[80px] rounded-full" />
                        </div>

                        <div className="text-base mx-auto ">
                            <Skeleton className="h-[1rem] w-[120px]" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
