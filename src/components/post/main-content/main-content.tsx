import AuthorMeta from './author-meta/author-meta';
import TagBadge from '@/components/shared/tag-badge';
import ParentPost from './parent-post';
import ChildPost from './child-post';
import { PostDetail } from '@/lib/define';
import CategoryBadge from '@/components/shared/category-badge';
import PostAction from './post-action/post-action';
import PopularPostList from '@/components/overview/home/popular-post/popular-post-list';
import { Suspense } from 'react';
import PopularPostListLoading from '@/components/overview/home/loading/popular-post-loading/popular-post-list-loading';
import PostComment from './post-comment/post-comment';

export default function MainContent({
    post,
    userId,
    isLiked,
}: {
    post: PostDetail;
    userId: string;
    isLiked: boolean;
}) {
    return (
        <div className="mt-5">
            <AuthorMeta
                author={post.author}
                commentsCount={post._count.comments}
                likesCount={post._count.likes}
                publishedAt={post.publishedAt}
            />
            <div className="mt-3">
                {post.categories.map(category => (
                    <CategoryBadge title={category.title} key={category.id} />
                ))}
            </div>
            <div>
                {post.tags.map(tag => (
                    <TagBadge title={tag.title} key={tag.id} />
                ))}
            </div>
            <ParentPost post={post} />
            {post.children.map(child => (
                <ChildPost post={child} key={child.id} />
            ))}

            <PostAction
                likesCount={post._count.likes}
                commentsCount={post._count.comments}
                userId={userId}
                isLiked={isLiked}
                postId={post.id}
            />

            <div className="my-16">
                <span className={`text-2xl font-bold`}>Bài viết phổ biến</span>
                <Suspense fallback={<PopularPostListLoading />}>
                    <PopularPostList />
                </Suspense>
            </div>

            <PostComment />
        </div>
    );
}
