import ViewImages from '@/components/shared/view-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MetaPostDetail } from '@/lib/define';
import { KeyType } from '@prisma/client';
import Image from 'next/image';

export default function PostMeta({ meta }: { meta: MetaPostDetail }) {
    const postMeta = (meta: MetaPostDetail) => {
        switch (meta.key) {
            case KeyType.IMG:
                return (
                    <Dialog>
                        <DialogTrigger asChild className="cursor-pointer">
                            <div className="py-2 md:p-5 lg:p-10">
                                <AspectRatio
                                    ratio={16 / 9}
                                    className="bg-muted"
                                >
                                    <Image
                                        src={meta.value}
                                        alt="Image"
                                        fill
                                        className="rounded-md object-cover"
                                    />
                                </AspectRatio>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none">
                            <ViewImages images={[meta.value]} />
                        </DialogContent>
                    </Dialog>
                );
            case KeyType.LINK:
                return (
                    <a
                        href={meta.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500"
                    >
                        {meta.value}
                    </a>
                );
            default:
                return null;
        }
    };

    return <>{postMeta(meta)}</>;
}
