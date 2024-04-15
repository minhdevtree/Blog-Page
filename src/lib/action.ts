'use server';

import { z } from 'zod';
import { signIn, signOut } from './auth';
import { RegisterFormSchema, loginFormSchema } from './form-schema';
import { hashPassword } from './utils';
import prisma from '@/lib/prisma';
import { AuthError } from 'next-auth';

export const githubLogin = async () => {
    await signIn('github');
};

export const googleLogin = async () => {
    await signIn('google');
};

export const logout = async () => {
    await signOut();
};

export const login = async (formData: z.infer<typeof loginFormSchema>) => {
    const { email, password }: z.infer<typeof loginFormSchema> = formData;
    try {
        await signIn('credentials', {
            email,
            password,
        });
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Tài khoản hoặc mật khẩu không chính xác' };
                case 'CredentialsSignin':
                    throw error;
                default:
                    return { error: 'Đã có lỗi xảy ra' };
            }
        }
    }
};

export const register = async (
    formData: z.infer<typeof RegisterFormSchema>
) => {
    try {
        const {
            fullName,
            username,
            email,
            phoneNumber,
            password,
        }: z.infer<typeof RegisterFormSchema> = formData;

        let user = prisma.user.findUnique({ where: { username } });
        if (await user) {
            return {
                isSuccess: false,
                error: 'Tên đăng nhập đã tồn tại',
            };
        }

        user = prisma.user.findUnique({ where: { email } });
        if (await user) {
            return { isSuccess: false, error: 'Email đã tồn tại' };
        }

        // if (phoneNumber) {
        //     user = prisma.user.find({ where: { phoneNumber } });
        //     if (await user) {
        //         return {
        //             isSuccess: false,
        //             error: 'Số điện thoại đã tồn tại',
        //         };
        //     }
        // }

        await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                phoneNumber,
                password: hashPassword(password),
            },
        });

        return { isSuccess: true };
    } catch {
        return { isSuccess: false, error: 'Đã có lỗi xảy ra' };
    }
};

export const handleLikePost = async (postId: string, userId: string) => {
    try {
        const like = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });

        if (like) {
            await prisma.like.delete({
                where: {
                    id: like.id,
                },
            });
            return { isSuccess: true, message: 'Đã bỏ thích bài viết' };
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });
            return { isSuccess: true, message: 'Đã thích bài viết' };
        }
    } catch {
        return { isSuccess: false, error: 'Đã xảy ra lỗi khi thích bài viết' };
    }
};
