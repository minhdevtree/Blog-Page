'use server';

import { z } from 'zod';
import axios from 'axios';
import { signIn, signOut } from './auth';
import {
    RegisterFormSchema,
    loginFormSchema,
    sendEmailActivateSchema,
} from './form-schema';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { CredentialsSignin } from 'next-auth';

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
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof CredentialsSignin) {
            switch (error.code) {
                case 'email_not_verified':
                    return {
                        error: 'Email chưa được xác thực',
                        errorType: 'email_not_verified',
                    };
                case 'account_not_exists':
                    return {
                        error: 'Tài khoản không tồn tại',
                        errorType: 'account_not_exists',
                    };
                case 'invalid_login_type':
                    return {
                        error: 'Email được liên kết với tài khoản với phương thức đăng nhập khác',
                        errorType: 'invalid_login_type',
                    };
                case 'invalid_login':
                    return {
                        error: 'Tài khoản hoặc mật khẩu không chính xác',
                        errorType: 'invalid_login',
                    };
                case 'unauthorized':
                    return {
                        error: 'Tài khoản đã bị khóa',
                        errorType: 'unauthorized',
                    };

                default:
                    return { error: 'Đã có lỗi xảy ra', errorType: 'unknown' };
            }
        } else {
            return { error: 'Đã có lỗi xảy ra', errorType: 'unknown' };
        }
        // if (error instanceof EmailNotVerifiedError) {
        //     return { error: 'Email chưa được xác minh' };
        // }
        // if (error instanceof AccountNotExistsError) {
        //     return { error: 'Tài khoản không tồn tại' };
        // }
        // if (error instanceof InvalidLoginError) {
        //     return { error: 'Tài khoản hoặc mật khẩu không chính xác' };
        // }
        // if (error instanceof UnauthorizedError) {
        //     return { error: 'Tài khoản đã bị khóa' };
        // }
        // return { error: 'Đã có lỗi xảy ra' };
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //             console.log(error);
        //             return { error: 'Tài khoản hoặc mật khẩu không chính xác' };
        //         case 'CredentialsSignin':
        //             throw error;
        //         default:
        //             return { error: 'Đã có lỗi xảy ra' };
        //     }
        // }
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

export const handleBookmarkPost = async (postId: string) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    const result = await axios
        .post(`/post/${postId}/bookmark`, undefined, {
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

export const handleFollowUser = async (userId: string) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    const result = await axios
        .post(`/user/${userId}/follow`, undefined, {
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
    content: string,
    parentId?: string
) => {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    const result = await axios
        .post(
            `/post/${postId}/comment`,
            {
                content,
                parentId,
            },
            {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            }
        )
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

export async function getUserStatus() {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    try {
        return await axios
            .get(`/user/status`, {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            })
            .then(res => res.data.data.status as string);
    } catch (error) {
        return 'UNAUTHENTICATED';
    }
}

export async function sendEmailActivate(
    formData: z.infer<typeof sendEmailActivateSchema>
) {
    const { email }: z.infer<typeof sendEmailActivateSchema> = formData;
    return await axios
        .post('/auth/activate/resend-email', { email })
        .then(res => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.error };
        });
}

export async function sendEmailForgotPassword(
    formData: z.infer<typeof sendEmailActivateSchema>
) {
    const { email }: z.infer<typeof sendEmailActivateSchema> = formData;
    return await axios
        .post('/auth/forgot-password', { email })
        .then(res => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.error };
        });
}

export async function resetPassword(token: string, password: string) {
    return await axios
        .post('/auth/forgot-password/change', { token, password })
        .then(res => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.error };
        });
}

export async function uploadImage(formData: FormData) {
    return await axios
        .post('/image/upload', formData, {
            headers: {
                'Content-Type': 'image/*',
            },
        })
        .then(res => {
            return { isSuccess: true, error: '', data: res.data.data.img };
        })
        .catch(error => {
            return {
                isSuccess: false,
                error: error.response.data.error,
                data: '',
            };
        });
}

export async function updateImgProfile(img: string) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    return await axios
        .post(
            '/user/profile/update-img',
            { img },
            {
                headers: {
                    Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
                },
            }
        )
        .then(res => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.error };
        });
}

export async function updateProfile(formData: any) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    return await axios
        .post('/user/profile/update', formData, {
            headers: {
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
            },
        })
        .then(res => {
            return { isSuccess: true, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.data.error };
        });
}

export async function createPost(formData: any) {
    const sessionTokenAuthJs = await getCookie('authjs.session-token');
    return await axios
        .post('/post/create', formData, {
            headers: {
                Cookie: `authjs.session-token=${sessionTokenAuthJs}`,
            },
        })
        .then(res => {
            return { isSuccess: true, data: res.data.data, error: '' };
        })
        .catch(error => {
            return { isSuccess: false, error: error.response.data.data.error };
        });
}
