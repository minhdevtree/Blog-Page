import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Email phải có định dạng chuẩn' }),
    password: z.string().min(8, { message: 'Mật khẩu phải ít nhất 8 kí tự' }),
});

export const postCommentSchema = z.object({
    content: z
        .string()
        .min(1, { message: 'Nội dung bình luận không được để trống' })
        .max(500, { message: 'Nội dung bình luận tối đa 500 kí tự' }),
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
