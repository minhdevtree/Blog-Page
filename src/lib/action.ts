'use server';

import { z } from 'zod';
import axios from 'axios';
import { signIn, signOut } from './auth';
import { RegisterFormSchema, loginFormSchema } from './form-schema';
import prisma from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';

axios.defaults.baseURL = process.env.API_URL;

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
    const {
        fullName,
        username,
        email,
        phoneNumber,
        password,
    }: z.infer<typeof RegisterFormSchema> = formData;

    const response = await axios
        .post('/auth/register', {
            fullName,
            username,
            email,
            phoneNumber,
            password,
        })
        .then(() => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            console.log(error.response.data);
            return { isSuccess: false, error: error.response.data.message };
        });
    return response;
};

export const getCookie = async (name: string) => {
    return cookies().get(name)?.value ?? '';
};

export const handleLikePost = async (postId: string) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    const result = await axios
        .post(`/post/${postId}/like`, undefined, {
            headers: {
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
            },
        })
        .then(response => {
            if (response.data.data.error) {
                return { isSuccess: false, message: response.data.data.error };
            }
            return { isSuccess: true, message: response.data.data.message };
        })
        .catch(error => {
            return {
                isSuccess: false,
                message: error.response.data.data.error,
            };
        });

    return result;
};

export const handleLikeComment = async (commentId: string) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    const result = await axios
        .post(`/comment/${commentId}/like`, undefined, {
            headers: {
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
            },
        })
        .then(response => {
            if (response.data.data.error) {
                return { isSuccess: false, message: response.data.data.error };
            }
            return { isSuccess: true, message: response.data.data.message };
        })
        .catch(error => {
            return {
                isSuccess: false,
                message: error.response.data.data.error,
            };
        });

    return result;
};

export const handleCommentPost = async (
    postId: string,
    userId: string,
    content: string,
    parentId?: string
) => {
    try {
        await prisma.postComment.create({
            data: {
                content,
                userId,
                postId,
                parentId,
            },
        });
        return { isSuccess: true, message: 'Đã bình luận bài viết' };
    } catch {
        return {
            isSuccess: false,
            error: 'Đã xảy ra lỗi khi bình luận bài viết',
        };
    }
};
