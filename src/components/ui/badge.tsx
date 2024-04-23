import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-sky-500 text-primary-foreground hover:bg-sky-500/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                third: 'border-transparent bg-gray-200 text-secondary-foreground hover:bg-gray-200/80',
                public_all:
                    'border-transparent bg-emerald-500 text-primary-foreground hover:bg-emerald-500/80',
                public_subscribers:
                    'border-transparent bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80',
                draft: 'border-transparent bg-zinc-600 text-primary-foreground hover:bg-zinc-600/80',
                tag: 'border-transparent bg-teal-500 text-primary-foreground hover:bg-teal-500/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
