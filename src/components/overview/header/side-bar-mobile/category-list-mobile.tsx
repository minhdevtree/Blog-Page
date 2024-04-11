import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Category, Subcategory } from '@/lib/define';
import Link from 'next/link';

export function CategoryListMobile({ categories }: { categories: Category[] }) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
        >
            {categories.map((category: Category) => (
                <AccordionItem value={category.slug} key={category.slug}>
                    <AccordionTrigger>{category.title}</AccordionTrigger>
                    <AccordionContent>
                        <Link href={`/category/${category.slug}/`}>
                            <AccordionContent key={category.slug + 'parent'}>
                                {category.title}
                            </AccordionContent>
                        </Link>
                        {category.children.map((subcategory: Subcategory) => {
                            if (subcategory.parentId === category.id) {
                                return (
                                    <Link
                                        href={`/category/${category.slug}/${subcategory.slug}`}
                                        key={subcategory.slug}
                                    >
                                        <AccordionContent>
                                            {subcategory.title}
                                        </AccordionContent>
                                    </Link>
                                );
                            }
                        })}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
