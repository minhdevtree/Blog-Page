'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { profileFormSchema } from '@/lib/form-schema';
import { UserLoginProfile } from '@/lib/define';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChangeEvent, useState } from 'react';
import { Icons } from '../icons/icons';
import { updateImgProfile, updateProfile, uploadImage } from '@/lib/action';
import { useSession } from 'next-auth/react';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: UserLoginProfile }) {
    const { data: session, update } = useSession();
    const [preview, setPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const defaultValues: Partial<ProfileFormValues> = {
        image: undefined,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        bio: user.intro || '',
        urls: user.urls.map(url => ({ value: url.url })),
    };
    const route = useRouter();
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        name: 'urls',
        control: form.control,
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

    const onSubmit = async (data: ProfileFormValues) => {
        setIsLoading(true);
        const formImageData = new FormData();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value == undefined) return;
            if (key === 'image' && typeof value !== 'string') {
                formImageData.append('image', data.image);
            } else {
                formData.append(key, value);
            }
        });

        if (formImageData.has('image')) {
            const result = await uploadImage(formImageData);
            if (result.isSuccess) {
                const updateImgProfileResult = await updateImgProfile(
                    result.data
                );
                if (updateImgProfileResult.isSuccess) {
                    update({
                        ...session,
                        user: {
                            ...session?.user,
                            img: result.data,
                        },
                    });
                    console.log(session);
                    toast.success('Cập nhật ảnh đại diện thành công!');
                } else {
                    toast.error('Có lỗi xảy ra khi cập nhật ảnh đại diện!');
                }
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật ảnh đại diện!');
            }
        }

        if (formData) {
            const result = await updateProfile(data);
            if (result.isSuccess) {
                if (data.email !== session?.user?.email) {
                    toast.success(
                        'Cập nhật hồ sơ thành công! Bạn cần xác minh lại email.'
                    );
                    route.push('/logout');
                    return;
                }
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        fullName: data.fullName,
                        username: data.username,
                    },
                });
                toast.success('Cập nhật hồ sơ thành công!');
            } else {
                toast.error(result.error);
            }
        }
        setIsLoading(false);
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
                                <Avatar className="h-[100px] w-[100px] border-[3px] border-sky-500">
                                    <AvatarImage
                                        className="object-cover"
                                        src={
                                            preview ||
                                            form.getValues('image') ||
                                            user.img
                                        }
                                        alt="avatar"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2 ">
                                    <FormLabel className="text-sky-500">
                                        Cập nhật ảnh đại diện
                                    </FormLabel>
                                    <label htmlFor="image">Chọn file</label>
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
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Họ và tên
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Họ và tên" {...field} />
                            </FormControl>
                            <FormDescription>
                                Cung cấp họ và tên thật giúp người khác dễ dàng
                                nhận biết bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Tên đăng nhập
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Tên đăng nhập" {...field} />
                            </FormControl>
                            <FormDescription>
                                Đây là tên hiển thị công khai của bạn. Nó có thể
                                là tên thật hoặc bút danh của bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name@email.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Nếu bạn thay đổi email, bạn sẽ cần xác minh lại
                                tài khoản.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Số điện thoại
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Số điện thoại" {...field} />
                            </FormControl>
                            <FormDescription>
                                Số điện thoại của bạn sẽ được sử dụng trong
                                trường hợp admin cần liên hệ.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Giới thiệu về bản thân"
                                    className="resize-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Viết một vài dòng về bản thân bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={cn(
                                            index !== 0 && 'sr-only',
                                            'text-sky-500'
                                        )}
                                    >
                                        URLs
                                    </FormLabel>
                                    <FormDescription
                                        className={cn(index !== 0 && 'sr-only')}
                                    >
                                        Thêm liên kết vào trang web, blog hoặc
                                        hồ sơ truyền thông xã hội của bạn.
                                    </FormDescription>
                                    <div className="flex gap-2 items-center">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-10"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="text-red-500 w-5 h-5" />
                                        </Button>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: '' })}
                    >
                        <Plus className="mr-2 h-4 w-4 text-sky-500" />
                        Thêm Url
                    </Button>
                </div>
                <Button type="submit">
                    {isLoading && (
                        <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                    )}
                    Cập nhật hồ sơ
                </Button>
            </form>
        </Form>
    );
}
