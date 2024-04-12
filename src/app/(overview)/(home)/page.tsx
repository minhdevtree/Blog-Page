import AllPost from '@/components/overview/home/all-post/all-post';
import Creator from '@/components/overview/home/creator/creator';
import { WelcomeDialog } from '@/components/overview/home/dialog/welcome-dialog';
import AllPostListLoading from '@/components/overview/home/loading/all-post-list-loading/all-post-list-loading';
import CreatorLoading from '@/components/overview/home/loading/creator-loading/creator-loading';
import { NewPostListLoading } from '@/components/overview/home/loading/new-post-list-loading/new-post-list-loading';
import PopularPostListLoading from '@/components/overview/home/loading/popular-post-loading/popular-post-list-loading';
import TagSectionLoading from '@/components/overview/home/loading/tag-loading/tag-section-loading';
import NewPostList from '@/components/overview/home/new-post-list/new-post-list';
import PopularPostList from '@/components/overview/home/popular-post/popular-post-list';
import TagSection from '@/components/overview/home/tag/tag';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

export default async function Home() {
    const session = await auth();
    return (
        <div>
            {!session && <WelcomeDialog />}
            <span className={`text-2xl font-bold`}>Bài viết mới</span>
            <Suspense fallback={<NewPostListLoading />}>
                <NewPostList />
            </Suspense>
            <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-4 my-5">
                <div className="col-span-1 lg:col-span-3 xl:col-span-3">
                    <div>
                        <span className={`text-2xl font-bold`}>
                            Tất cả bài viết
                        </span>
                        <Suspense fallback={<AllPostListLoading />}>
                            <AllPost />
                        </Suspense>
                    </div>
                    <div className="my-8">
                        <Suspense fallback={<CreatorLoading />}>
                            <Creator />
                        </Suspense>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 xl:col-span-1 grid grid-cols-1 gap-2">
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className={`text-2xl font-bold`}>
                                Xu hướng
                            </span>
                            <Suspense fallback={<TagSectionLoading />}>
                                <TagSection />
                            </Suspense>
                        </div>
                        <div>
                            <span className={`text-2xl font-bold`}>
                                Bài viết phổ biến
                            </span>
                            <Suspense fallback={<PopularPostListLoading />}>
                                <PopularPostList />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
