import { PublishedType } from '@prisma/client';
import { Badge } from '../ui/badge';
import { Earth, UserRoundCheck } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PublishedBadge({ status }: { status: string }) {
    const getPublishedBadge = ({ status }: { status: string }) => {
        switch (status) {
            case PublishedType.PUBLISHED_ALL:
                return (
                    <Badge variant="public_all" className="gap-1">
                        <Earth size={12} />{' '}
                        <span className="line-clamp-1">Công khai</span>
                    </Badge>
                );
            case PublishedType.PUBLISHED_SUBSCRIBERS:
                return (
                    <Badge variant="public_subscribers" className="gap-1">
                        <UserRoundCheck size={12} />{' '}
                        <span className="line-clamp-1">
                            Dành cho người đăng ký
                        </span>
                    </Badge>
                );
            default:
                return <Badge variant="outline">Nháp</Badge>;
        }
    };

    const getPublishedName = (status: string) => {
        switch (status) {
            case PublishedType.PUBLISHED_ALL:
                return 'Công khai';
            case PublishedType.PUBLISHED_SUBSCRIBERS:
                return 'Dành cho người đăng ký';
            default:
                return 'Nháp';
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{getPublishedBadge({ status })}</TooltipTrigger>
                <TooltipContent>
                    <p>{getPublishedName(status)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
