'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icons } from '@/components/icons/icons';
import { resetPassword } from '@/lib/action';

const formSchema = z
    .object({
        token: z.string(),
        password: z
            .string({ required_error: 'Password is required.' })
            .min(8, { message: 'Password must be at least 8 characters.' })
            .refine(password => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password), {
                message:
                    'Password must contain at least 1 character and 1 number.',
            }),
        confirmPassword: z.string({
            required_error: 'Confirm Password is required.',
        }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export function ChangePasswordForm({ token }: Readonly<{ token: string }>) {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: token,
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await resetPassword(values.token, values.password);
        if (result.isSuccess) {
            toast.success(
                'Đặt lại mật khẩu thành công, vui lòng đăng nhập lại'
            );
            push('/login');
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className={cn('grid gap-6')}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu mới</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            autoFocus
                                            disabled={isLoading}
                                            placeholder="Mật khẩu mới"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            autoFocus
                                            disabled={isLoading}
                                            placeholder="Nhập lại mật khẩu mới"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Đổi mật khẩu
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
