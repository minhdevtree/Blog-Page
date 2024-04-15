import AuthorMeta from './author-meta/author-meta';
import TagBadge from '@/components/shared/tag-badge';
import ParentPost from './parent-post';
import ChildPost from './child-post';
import { PostDetail } from '@/lib/define';
import CategoryBadge from '@/components/shared/category-badge';
import PostAction from './post-action/post-action';

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
        </div>
    );
}
