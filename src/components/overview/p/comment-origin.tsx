import PostCommentCard from '@/components/post/main-content/post-comment/post-comment-card';
import { PostComment } from '@/lib/define';

// export type PostComment = {
//     id: string;
//     content: string;
//     createdAt: string;
//     _count: {
//         children: number;
//         likes: number;
//     };
//     user: {
//         id: string;
//         fullName: string;
//         username: string;
//         img: string;
//     };
// };

export default async function CommentOrigin({
    commentId,
    postId,
    session,
}: {
    commentId: string;
    postId: string;
    session: any;
}) {
    const comment =
        (await prisma.postComment.findUnique({
            where: {
                id: commentId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                _count: {
                    select: {
                        children: true,
                        likes: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        img: true,
                    },
                },
            },
        })) || ({} as PostComment);
    return (
        <PostCommentCard
            comment={comment as PostComment}
            postId={postId}
            child={true}
            session={session}
            onlyParent={true}
        />
    );
}
