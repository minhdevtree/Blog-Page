import { AppearanceForm } from '@/components/edit-profile/appearance/appearance-form';
import { Separator } from '@/components/ui/separator';

export default function SettingsAppearancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Giao diện</h3>
                <p className="text-sm text-muted-foreground">
                    Tùy chỉnh giao diện của trang web. Tự động chuyển đổi chế độ
                    sáng và tối.
                </p>
            </div>
            <Separator />
            <AppearanceForm />
        </div>
    );
}
