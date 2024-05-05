import { PublishedType } from '@prisma/client';
import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Email phải có định dạng chuẩn' }),
    password: z.string().min(8, { message: 'Mật khẩu phải ít nhất 8 kí tự' }),
});

export const postCommentSchema = z.object({
    content: z
        .string()
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length >= 1, {
            message: 'Nội dung bình luận không được để trống',
        })
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length <= 1000, {
            message: 'Nội dung bình luận tối đa 1000 kí tự',
        }),
});

export const createPostSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'Tiêu đề không được để trống' })
        .max(100, { message: 'Tiêu đề tối đa 100 kí tự' }),
    image: z.any(),
    summary: z
        .string()
        .max(200, { message: 'Tóm tắt tối đa 500 kí tự' })
        .optional(),
    content: z
        .string()
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length >= 1, {
            message: 'Nội dung bài viết không được để trống',
        })
        .refine(val => val.replace(/<[^>]+>/g, '').trim().length <= 10000, {
            message: 'Nội dung bài viết tối đa 10000 kí tự',
        }),
    tags: z
        .array(
            z
                .string()
                .min(1, { message: 'Tag không được để trống' })
                .max(20, { message: 'Tag tối đa 20 kí tự' })
        )
        .max(5, { message: 'Số lượng tag không được vượt quá 5' })
        .refine(items => new Set(items).size === items.length, {
            message: 'Tag không được trùng nhau',
        }),
    categories: z
        .array(z.string().min(1, { message: 'Danh mục không được để trống' }))
        .max(3, { message: 'Số lượng danh mục không được vượt quá 3' }),
    published: z.nativeEnum(PublishedType),
    subPosts: z
        .array(
            z.object({
                title: z
                    .string()
                    .min(1, { message: 'Tiêu đề không được để trống' })
                    .max(100, { message: 'Tiêu đề tối đa 100 kí tự' }),
                content: z
                    .string()
                    .refine(
                        val => val.replace(/<[^>]+>/g, '').trim().length >= 1,
                        {
                            message: 'Nội dung bài viết không được để trống',
                        }
                    )
                    .refine(
                        val =>
                            val.replace(/<[^>]+>/g, '').trim().length <= 10000,
                        {
                            message: 'Nội dung bài viết tối đa 10000 kí tự',
                        }
                    ),
                image: z.any().optional(),
            })
        )
        .max(20, { message: 'Số lượng không được vượt quá 20' })
        .optional(),
});

export const sendEmailSchema = z.object({
    email: z.string().email({ message: 'Email phải có định dạng chuẩn' }),
    subject: z
        .string()
        .min(1, { message: 'Chủ đề không được để trống' })
        .max(100, { message: 'Chủ đề tối đa 100 kí tự' }),
    content: z
        .string()
        .min(1, { message: 'Nội dung không được để trống' })
        .max(500, { message: 'Nội dung tối đa 500 kí tự' }),
    template: z.string().optional(),
});

export const sendEmailActivateSchema = z.object({
    email: z.string().email({ message: 'Email phải có định dạng chuẩn' }),
});

export const profileFormSchema = z.object({
    image: z.any().optional(),
    fullName: z
        .string({ required_error: 'Vui lòng điền họ tên' })
        .min(3, { message: 'Tên phải có ít nhất 3 kí tự' })
        .max(50, { message: 'Tên có tối đa 50 kí tự' }),
    username: z
        .string({ required_error: 'Vui lòng điền tên đăng nhập' })
        .min(3, { message: 'Tên đăng nhập phải có ít nhất 3 kí tự' })
        .max(20, { message: 'Tên đăng nhập có tối đa 20 kí tự' }),
    email: z
        .string({ required_error: 'Vui lòng điền email' })
        .email({ message: 'Email phải có định dạng chuẩn' }),
    phoneNumber: z
        .string()
        .min(10, { message: 'Số điện thoại phải có ít nhất 10 kí tự' })
        .optional()
        .or(z.literal(''))
        .transform(e => (e === '' ? undefined : e)),
    bio: z
        .string()
        .max(160, { message: 'Bio có tối đa 160 kí tự' })
        .min(4, { message: 'Bio phải có ít nhất 4 kí tự' })
        .optional()
        .or(z.literal(''))
        .transform(e => (e === '' ? undefined : e)),
    urls: z
        .array(
            z.object({
                value: z
                    .string()
                    .url({ message: 'Url phải có định dạng chuẩn' })
                    .max(100, { message: 'Url có tối đa 100 kí tự' })
                    .min(1, { message: 'Url không được để trống' }),
            })
        )
        .max(5, { message: 'Số lượng URL không được vượt quá 5' })
        .optional(),
});

export const RegisterFormSchema = z.object({
    fullName: z
        .string({ required_error: 'Vui lòng điền họ tên' })
        .min(3, { message: 'Tên phải có ít nhất 3 kí tự' })
        .max(50, { message: 'Tên có tối đa 50 kí tự' }),
    username: z
        .string({ required_error: 'Vui lòng điền tên đăng nhập' })
        .min(3, { message: 'Tên đăng nhập phải có ít nhất 3 kí tự' })
        .max(20, { message: 'Tên đăng nhập có tối đa 20 kí tự' }),
    email: z
        .string({ required_error: 'Vui lòng điền email' })
        .email({ message: 'Email phải có định dạng chuẩn' }),
    phoneNumber: z
        .string()
        .min(10, { message: 'Số điện thoại phải có ít nhất 10 kí tự' })
        .optional()
        .or(z.literal(''))
        .transform(e => (e === '' ? undefined : e)),
    password: z
        .string({ required_error: 'Vui lòng điền mật khẩu' })
        .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
        .refine(password => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password), {
            message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số',
        }),
});
