import PopularPostCardLoading from './popular-post-card-loading';

export default function PopularPostListLoading() {
    return (
        <div className="grid grid-cols-1 gap-2 my-2">
            {Array.from({ length: 3 }).map((_, index) => (
                <PopularPostCardLoading key={index} />
            ))}
        </div>
    );
}
