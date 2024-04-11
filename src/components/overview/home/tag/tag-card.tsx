import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link2Icon } from '@radix-ui/react-icons';
import { Tag } from '@/lib/define';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function TagCard({ tag, value }: { tag: Tag; value: number }) {
    const getBackgroundColour = (number: number) => {
        switch (number) {
            case 0:
                return 'border-transparent bg-emerald-500 hover:bg-emerald-500/80';
            case 1:
                return 'border-transparent bg-sky-500 hover:bg-sky-500/80';
            case 2:
                return 'border-transparent bg-rose-500 hover:bg-rose-500/80';
            case 3:
                return 'border-transparent bg-amber-500 hover:bg-amber-500/80';
            case 4:
                return 'border-transparent bg-purple-500 hover:bg-purple-500/80';
            default:
                return 'border-transparent bg-fuchsia-500 hover:bg-fuchsia-500/80';
        }
    };
    return (
        <Link href={`/tag/${tag.slug}`} passHref className="whitespace-nowrap">
            <Card
                className={cn('p-2 cursor-pointer', getBackgroundColour(value))}
            >
                <CardContent className="p-0">
                    <div className="font-bold text-white">#{tag.title}</div>
                </CardContent>
            </Card>
        </Link>
    );
}
