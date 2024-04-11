import { siteConfig } from '@/config/site';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icons/icons';
import { getTopCreators } from '@/lib/data';
import { BasicTooltip } from '@/components/shared/tool-tip';

export default async function Creator() {
    const creators = await getTopCreators();
    const getIcon = (index: number) => {
        switch (index) {
            case 0:
                return <Icons.top1 />;
            case 1:
                return <Icons.top2 />;
            case 2:
                return <Icons.top3 />;
            default:
                return <Icons.top1 />;
        }
    };
    return (
        <Card className="p-10 bg-auth">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5">
                <div className="col-span-1 flex flex-col justify-center gap-3">
                    <div className="font-bold text-2xl md:text-3xl mx-auto">
                        <span className="text-sky-500">{siteConfig.name}</span>{' '}
                        Creator
                    </div>
                    <span className="text-xs md:text-sm mx-auto">
                        Chia sẻ kiến thức với cộng đồng
                    </span>
                </div>
                <div className="lg:col-span-2 flex w-full justify-between">
                    {creators.map((creator, index) => (
                        <div
                            className="flex flex-col items-center gap-3"
                            key={index}
                        >
                            <div className="relative">
                                <Avatar className="md:h-[60px] md:w-[60px] xl:h-[80px] xl:w-[80px] border-[3px] ">
                                    <AvatarImage
                                        src={creator.img}
                                        alt="avatar"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-[-12px] left-[-3px]">
                                    {getIcon(index)}
                                </div>
                            </div>

                            <div className="text-base mx-auto ">
                                <BasicTooltip title={creator.fullName} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
