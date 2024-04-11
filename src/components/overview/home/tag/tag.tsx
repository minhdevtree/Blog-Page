import { getPopularTags } from '@/lib/data';
import { TagCard } from './tag-card';

export default async function TagSection() {
    const tags = await getPopularTags();
    return (
        <section className="my-4">
            <div className="flex gap-2 flex-wrap">
                {tags.map((tag, index) => (
                    <TagCard key={index} tag={tag} value={index} />
                ))}
            </div>
        </section>
    );
}
