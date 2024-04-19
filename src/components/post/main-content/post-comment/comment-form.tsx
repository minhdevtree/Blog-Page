'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { postCommentSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons/icons';
import { useRouter } from 'next/navigation';
import { handleCommentPost } from '@/lib/action';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CommentForm({
    session,
    postId,
}: {
    session: any;
    postId: string;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof postCommentSchema>>({
        resolver: zodResolver(postCommentSchema),
        defaultValues: {
            content: '',
        },
    });
    const handleSubmitComment = async (
        values: z.infer<typeof postCommentSchema>
    ) => {
        setIsLoading(true);

        const result = await handleCommentPost(
            postId,
            session.user.id,
            values.content
        );
        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message);
            form.reset();
            router.refresh();
        }
        setIsLoading(false);
    };

    return (
        <div className="mt-5 ">
            <div className="flex items-start justify-start gap-5">
                <Avatar className="border-solid border-sky-500 border-2 w-[45px] h-[45px]">
                    <AvatarImage
                        src={session?.user.img || '/avatar/noavatar.png'}
                        alt="avatar"
                    />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    {session ? (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(
                                    handleSubmitComment
                                )}
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    id="content"
                                                    placeholder="Viết bình luận..."
                                                    disabled={isLoading}
                                                    {...field}
                                                    className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-sky-500 focus-visible:ring-offset-1 "
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="mt-2 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        variant="default"
                                    >
                                        {isLoading && (
                                            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Gửi
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    ) : (
                        <Link href="/login">
                            <div className="text-sm ">
                                Đăng nhập một phát, tha hồ bình luận (^ 3^)
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
