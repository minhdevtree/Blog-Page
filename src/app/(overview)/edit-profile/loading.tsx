import ProfileFormLoading from '@/components/edit-profile/loading/profile-form-loading';
import { Icons } from '@/components/icons/icons';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-6">
            <div>
                <div className="h-[1.75rem]">
                    <Skeleton className="h-[1.5rem] w-[80px] rounded-lg" />
                </div>
                <div className="h-[1.25rem]">
                    <Skeleton className="h-[1rem] w-[200px] rounded-lg" />
                </div>
            </div>
            <Separator />
            <ProfileFormLoading />
        </div>
    );
}
