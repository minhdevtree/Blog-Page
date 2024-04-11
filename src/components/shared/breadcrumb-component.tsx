import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BreadItem } from '@/lib/define';
import { Home } from 'lucide-react';

export default function BreadcrumbComponent({
    breadcrumbs,
}: {
    breadcrumbs: BreadItem[];
}) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex gap-1">
                        <Home className="w-4 h-4" />
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs
                    .slice(0, breadcrumbs.length - 1)
                    .map((breadcrumb, index) => (
                        <>
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink href={breadcrumb.url}>
                                    {breadcrumb.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {breadcrumbs[breadcrumbs.length - 1].title}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
