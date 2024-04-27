'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
    image: z.any().optional(),
});

export default function HelloWorldPage() {
    const [preview, setPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined,
        },
    });

    function getImageData(event: ChangeEvent<HTMLInputElement>) {
        const dataTransfer = new DataTransfer();

        Array.from(event.target.files!).forEach(image =>
            dataTransfer.items.add(image)
        );

        const files = dataTransfer.files;
        const displayUrl = URL.createObjectURL(event.target.files![0]);

        return { files, displayUrl };
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', values.image);

        try {
            const res = await axios.post(
                'http://localhost:3000/api/image/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'image/*',
                    },
                }
            );
            console.log(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <FormItem className="flex gap-4">
                                <Avatar className="h-[100px] w-[100px] border-[3px]">
                                    <AvatarImage
                                        className="object-cover"
                                        src={preview || form.getValues('image')}
                                        alt="avatar"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2 ">
                                    <FormLabel>Upload new avatar</FormLabel>
                                    <label htmlFor="image">Choose File</label>
                                </div>
                                <FormControl>
                                    <Input
                                        id="image"
                                        className="hidden"
                                        accept={'image/*'}
                                        type="file"
                                        {...rest}
                                        onChange={event => {
                                            const { files, displayUrl } =
                                                getImageData(event);
                                            setPreview(displayUrl);
                                            onChange(files[0]);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />

                <Button type="submit">
                    {isLoading && (
                        <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update profile
                </Button>
            </form>
        </Form>
    );
}
