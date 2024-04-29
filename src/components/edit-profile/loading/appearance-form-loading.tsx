import { Skeleton } from '@/components/ui/skeleton';

export default function AppearanceFormLoading() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[1rem] w-[80px] rounded-lg" />
                </div>
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[1rem] w-[200px] rounded-lg" />
                </div>
            </div>
        </div>
    );
}
