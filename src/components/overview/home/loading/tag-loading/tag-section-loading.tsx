import { TagCardLoading } from './tag-loading';

export default function TagSectionLoading() {
    return (
        <section className="my-4">
            <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 5 }).map((_, index) => (
                    <TagCardLoading key={index} />
                ))}
            </div>
        </section>
    );
}
