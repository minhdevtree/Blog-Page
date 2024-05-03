'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import Tiptap from '@/components/shared/tip-tap';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { Suspense, useState } from 'react';
import { Input } from '@/components/ui/input';

export const postSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Tiêu đề không được để trống' })
        .max(100, { message: 'Tiêu đề tối đa 100 kí tự' }),
    content: z
        .string()
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length >= 1, {
            message: 'Nội dung bài viết không được để trống',
        })
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length <= 1000, {
            message: 'Nội dung bài viết tối đa 1000 kí tự',
        }),
});

export default function TiptapPage() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });
    const handleSubmit = async (values: z.infer<typeof postSchema>) => {
        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Tiêu đề
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Tiêu đề" {...field} />
                            </FormControl>
                            <FormDescription>
                                Tối thiểu 1 kí tự, tối đa 100 kí tự
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Nội dung
                            </FormLabel>
                            <FormControl>
                                <Suspense
                                    fallback={
                                        <div className="text-4xl">
                                            Loading...
                                        </div>
                                    }
                                >
                                    <Tiptap
                                        description={field.value}
                                        onChange={field.onChange}
                                        className="min-h-[300px]"
                                    />
                                </Suspense>
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
                        Lưu
                    </Button>
                </div>
            </form>
        </Form>
    );
}
