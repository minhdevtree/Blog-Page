'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    Check,
    ChevronsUpDown,
    Earth,
    LockKeyhole,
    Plus,
    StickyNote,
    Trash2,
    UserRoundCheck,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { createPost, uploadImage } from '@/lib/action';
import { toast } from 'sonner';
import { createPostSchema } from '@/lib/form-schema';
import { Category, createSubPost } from '@/lib/define';
import { PublishedType } from '@prisma/client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';

type Cate = {
    title: string;
    id: string;
    isParent: boolean;
};

export default function CreatePostForm({
    categories,
}: {
    categories: Category[];
}) {
    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [previews, setPreviews] = useState({} as any);
    const [isSetImage, setIsSetImage] = useState(true);
    const cates = categories
        .map(category => {
            const cate = {
                title: category.title,
                id: category.id,
                isParent: true,
            };
            let subcategories = category.children
                ? category.children.map(subcategory => ({
                      id: subcategory.id,
                      title: subcategory.title,
                      isParent: false,
                  }))
                : [];
            return [cate, ...subcategories];
        })
        .flat() as Cate[];

    const form = useForm<z.infer<typeof createPostSchema>>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: '',
            summary: '',
            content: '',
            image: '',
            tags: [],
            categories: [],
            published: PublishedType.DRAFT,
            subPosts: [] as createSubPost[],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: 'subPosts',
        control: form.control,
    });

    const {
        append: appendTags,
        fields: tagsFields,
        remove: removeTags,
    } = useFieldArray({
        control: form.control,
        name: 'tags',
    });

    const {
        fields: catesFields,
        append: appendCates,
        remove: removeCates,
    } = useFieldArray({
        control: form.control,
        name: 'categories',
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

    const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
        setIsLoading(true);
        const formImageData = new FormData();

        const formSubImageData = new FormData();
        let coutSubImage = 0;
        Object.entries(data).forEach(([key, value]) => {
            if (value == undefined) return;
            if (key === 'image' && typeof value !== 'string') {
                formImageData.append(key, value);
            } else if (key === 'subPosts') {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].image && typeof value[i].image !== 'string') {
                        formSubImageData.append(`subImage${i}`, value[i].image);
                        coutSubImage++;
                    }
                }
            } else {
            }
        });

        if (formImageData.has('image')) {
            const imageValue = formImageData.get('image');
            if (imageValue !== null) {
                const formImage = new FormData();
                formImage.set('image', imageValue);
                const result = await uploadImage(formImage, 'post/');
                if (result.isSuccess) {
                    data.image = result.data;
                } else {
                    toast.error('Có lỗi xảy ra khi tải ảnh bìa');
                }
            }
        }

        if (formSubImageData) {
            for (let i = 0; i < coutSubImage; i++) {
                const imageValue = formSubImageData.get(`subImage${i}`);
                if (imageValue !== null) {
                    const formImage = new FormData();
                    formImage.set('image', imageValue);
                    const result = await uploadImage(formImage, 'post/');
                    if (result.isSuccess) {
                        if (data?.subPosts?.[i]?.image) {
                            data.subPosts[i].image = result.data;
                        }
                    } else {
                        toast.error('Có lỗi xảy ra khi tải ảnh bài viết');
                    }
                }
            }
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value == undefined) return;
            if (key === 'subPosts') {
                formData.append(key, value);
            }
        });

        if (formData) {
            if (data.image === '') {
                setIsSetImage(false);
                return;
            } else {
                setIsSetImage(true);
            }
            const result = await createPost(data);
            console.log(result);
            if (result.isSuccess) {
                toast.success('Tạo bài viết thành công!');
                route.push('/');
                route.refresh();
            } else {
                toast.error(result?.error);
            }
        }
        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Tiêu đề
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Tiêu đề" {...field} />
                            </FormControl>
                            <FormDescription>Tối đa 100 kí tự</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                    {tagsFields.map((tagField, index) => (
                        <FormField
                            key={tagField.id}
                            control={form.control}
                            name={`tags.${index}`}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2 items-center">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-10"
                                            onClick={() => removeTags(index)}
                                        >
                                            <Trash2 className="text-red-500 w-5 h-5" />
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    {tagsFields.length < 5 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendTags('')}
                        >
                            <Plus className="mr-2 h-4 w-4 text-sky-500" />
                            Thêm tag
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {catesFields.map((cateField, index) => (
                        <FormField
                            control={form.control}
                            key={cateField.id}
                            name={`categories.${index}`}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            'w-[200px] justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value
                                                            ? cates.find(
                                                                  c =>
                                                                      c.id ===
                                                                      field.value
                                                              )?.title
                                                            : 'Chọn danh mục'}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-10"
                                                    onClick={() =>
                                                        removeCates(index)
                                                    }
                                                >
                                                    <Trash2 className="text-red-500 w-5 h-5" />
                                                </Button>
                                            </div>
                                        </PopoverTrigger>

                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Tìm danh mục..." />
                                                <CommandEmpty>
                                                    Không tìm thấy kết quả
                                                </CommandEmpty>
                                                <CommandList>
                                                    {/* <CommandGroup title="Danh mục"> */}
                                                    {cates.map(c => (
                                                        <CommandItem
                                                            value={c.id}
                                                            key={c.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    `categories.${index}`,
                                                                    c.id
                                                                );
                                                            }}
                                                            className={`text-sm ${
                                                                c.isParent &&
                                                                'font-bold'
                                                            }`}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    'mr-2 h-4 w-4',
                                                                    c.id ===
                                                                        field.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                )}
                                                            />
                                                            {c.title}
                                                        </CommandItem>
                                                    ))}
                                                    {/* </CommandGroup> */}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    {catesFields.length < 5 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendCates('')}
                        >
                            <Plus className="mr-2 h-4 w-4 text-sky-500" />
                            Thêm danh mục
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sky-500">
                                    Trạng thái
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Trạng thái bài viết" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={PublishedType.DRAFT}>
                                            <StickyNote className="mr-2 h-4 w-4 inline-block" />
                                            Nháp
                                        </SelectItem>
                                        <SelectItem
                                            value={PublishedType.PRIVATE}
                                        >
                                            <LockKeyhole className="mr-2 h-4 w-4 inline-block" />
                                            Riêng tư
                                        </SelectItem>
                                        <SelectItem
                                            value={
                                                PublishedType.PUBLISHED_SUBSCRIBERS
                                            }
                                        >
                                            <UserRoundCheck className="mr-2 h-4 w-4 inline-block" />
                                            Dành cho người đăng ký
                                        </SelectItem>{' '}
                                        <SelectItem
                                            value={PublishedType.PUBLISHED_ALL}
                                        >
                                            <Earth className="mr-2 h-4 w-4 inline-block" />
                                            Công khai
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Trạng thái bài viết sẽ ảnh hưởng đến việc
                                    hiển thị bài viết trên trang web
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sky-500">
                                Tóm tắt
                            </FormLabel>
                            <FormControl>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tóm tắt bài viết"
                                        className="resize-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                                        {...field}
                                    />
                                </FormControl>
                            </FormControl>
                            <FormDescription>Tối đa 700 kí tự</FormDescription>
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
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Tiptap
                                    description={field.value}
                                    onChange={field.onChange}
                                    className="min-h-[300px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <FormItem className="flex gap-4">
                                <div className="flex flex-col gap-2 ">
                                    <FormLabel className="text-sky-500">
                                        Ảnh bìa
                                        <span className="text-red-500">*</span>
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
                                            setPreviews((prev: any) => ({
                                                ...prev,
                                                image: displayUrl,
                                            }));
                                            onChange(files[0]);
                                        }}
                                    />
                                </FormControl>
                                {!isSetImage && (
                                    <FormMessage>
                                        Bạn chưa chọn ảnh bìa
                                    </FormMessage>
                                )}
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />
                {previews?.image && (
                    <div className="max-w-[400px]">
                        <AspectRatio ratio={16 / 9} className="bg-muted">
                            <Image
                                src={previews.image}
                                alt="preview image"
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                    </div>
                )}

                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <FormField
                                control={form.control}
                                name={`subPosts.${index}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={cn(
                                                index !== 0 && 'sr-only',
                                                'text-sky-500'
                                            )}
                                        >
                                            Tiêu đề bài viết con
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormDescription
                                            className={cn(
                                                index !== 0 && 'sr-only'
                                            )}
                                        >
                                            Tạo các bài viết con giúp trang web
                                            xác định được mục lục bài viết của
                                            bạn.
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
                            <FormField
                                control={form.control}
                                name={`subPosts.${index}.content`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className={cn(
                                                index !== 0 && 'sr-only',
                                                'text-sky-500'
                                            )}
                                        >
                                            Nội dung bài viết con
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <div>
                                            <FormControl>
                                                <Tiptap
                                                    description={field.value}
                                                    onChange={field.onChange}
                                                    className="min-h-[300px]"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`subPosts.${index}.image`}
                                render={({
                                    field: { onChange, value, ...rest },
                                }) => (
                                    <>
                                        <FormItem className="flex gap-4">
                                            <div className="flex flex-col gap-2 ">
                                                <FormLabel className="text-sky-500">
                                                    Ảnh cho bài viết con
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <label
                                                    htmlFor={`subPosts.${index}.image`}
                                                >
                                                    Chọn file
                                                </label>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id={`subPosts.${index}.image`}
                                                    className="hidden"
                                                    accept={'image/*'}
                                                    type="file"
                                                    {...rest}
                                                    onChange={event => {
                                                        const {
                                                            files,
                                                            displayUrl,
                                                        } = getImageData(event);
                                                        setPreviews(
                                                            (prev: any) => ({
                                                                ...prev,
                                                                [`subImage${index}`]:
                                                                    displayUrl,
                                                            })
                                                        );
                                                        onChange(files[0]);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            {previews[`subImage${index}`] && (
                                <div className="max-w-[400px]">
                                    <AspectRatio
                                        ratio={16 / 9}
                                        className="bg-muted"
                                    >
                                        <Image
                                            src={previews[`subImage${index}`]}
                                            alt={`preview image of sub post ${index}`}
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                    </AspectRatio>
                                </div>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                            append({
                                title: '',
                                content: '',
                                image: '',
                            } as createSubPost)
                        }
                    >
                        <Plus className="mr-2 h-4 w-4 text-sky-500" />
                        Thêm bài viết con
                    </Button>
                </div>
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
