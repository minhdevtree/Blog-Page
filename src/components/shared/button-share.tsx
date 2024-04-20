'use client';

import { Button } from '@/components/ui/button';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Share2 } from 'lucide-react';

const ButtonShare = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="hidden"
                    className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                    }}
                >
                    <Share2 />
                    <span className="max-md:hidden">Chia sẻ</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex justify-center">
                            <CheckCircledIcon className="w-10 h-10 text-green-400" />
                        </div>
                        <div className="flex justify-center text-sm font-medium">
                            Link copied
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ButtonShare;
