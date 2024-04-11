'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Icons } from '@/components/icons/icons';
import { Category, Subcategory } from '@/lib/define';

export default function CategoryList({
    categories,
}: {
    categories: Category[];
}) {
    return (
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
                {categories.map((category: Category) => (
                    <NavigationMenuItem key={category.slug}>
                        <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent">
                            {category.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href={`/category/${category.slug}`}
                                        >
                                            <Icons.cloud className="h-6 w-6" />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                {category.title}
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                {category.content}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                {category.children.map(
                                    (subcategory: Subcategory) => (
                                        <ListItem
                                            key={subcategory.slug}
                                            href={`/category/${category.slug}/${subcategory.slug}`}
                                            title={subcategory.title}
                                        >
                                            {subcategory.content}
                                        </ListItem>
                                    )
                                )}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = 'ListItem';
