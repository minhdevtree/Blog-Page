import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function TagCardLoading() {
    return (
        <div className="whitespace-nowrap">
            <Card className="p-2 cursor-pointer">
                <CardContent className="p-0">
                    <Skeleton className="h-[1.3rem] w-[100px] rounded-lg" />
                </CardContent>
            </Card>
        </div>
    );
}
