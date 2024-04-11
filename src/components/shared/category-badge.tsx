import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export default function CategoryBadge({ title }: { title: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge className="line-clamp-1">{title}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
