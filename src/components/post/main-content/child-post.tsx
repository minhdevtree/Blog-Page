import { ChildPostDetail } from '@/lib/define';
import PostMeta from './post-meta';
import parse from 'html-react-parser';

export default function ChildPost({ post }: { post: ChildPostDetail }) {
    return (
        <div className="mt-10">
            <h1
                className="text-xl font-bold leading-none text-sky-500 my-5"
                id={post.id}
            >
                {`${post?.order}. ${post?.title}`}
            </h1>
            <div className="mt-2">{parse(post?.content)}</div>
            {post?.metas.map((meta, index) => (
                <PostMeta meta={meta} key={index} />
            ))}
        </div>
    );
}
