import PostCardLoading from './post-card-loading';

export default function AllPostListLoading() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 my-2">
            {Array.from({ length: 9 }).map((_, index) => (
                <PostCardLoading key={index} />
            ))}
        </div>
    );
}
