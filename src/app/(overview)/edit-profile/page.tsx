import { ProfileForm } from '@/components/edit-profile/profile-form';
import { Separator } from '@/components/ui/separator';
import { getUserLoginProfile } from '@/lib/data';

export default async function SettingsProfilePage() {
    const user = await getUserLoginProfile();
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Hồ sơ</h3>
                <p className="text-sm text-muted-foreground">
                    Đây là cách người khác sẽ nhìn thấy bạn trên trang web.
                </p>
            </div>
            <Separator />
            <ProfileForm user={user} />
        </div>
    );
}
