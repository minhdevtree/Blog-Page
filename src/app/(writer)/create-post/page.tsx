import { Separator } from '@/components/ui/separator';
import CreatePostForm from '@/components/writer/create-post/create-post-form';
import { getCategories } from '@/lib/data';
import { Suspense } from 'react';

export default async function CreatePostPage() {
    const categories = await getCategories();
    return (
        <>
            <div className="space-y-6">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight text-sky-500">
                        Tạo bài viết
                    </h2>
                    <p className="text-muted-foreground">
                        Viết bài viết của bạn và chia sẻ với mọi người
                    </p>
                </div>
            </div>
            <Separator className="my-6" />
            <Suspense fallback={<div>Đang tải form</div>}>
                <CreatePostForm categories={categories} />
            </Suspense>
        </>
    );
}
