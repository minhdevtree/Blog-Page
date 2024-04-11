import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';

export default function DistanceToNowToolTip({ date }: { date: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{getFormatDistanceToNow(date)}</TooltipTrigger>
                <TooltipContent>
                    <p>{getDateFormatted(date)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
