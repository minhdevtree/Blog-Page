'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { loginFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { Icons } from '../../icons/icons';
import { login } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function UserAuthLoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginResult, setLoginResult] = useState<
        { error?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
        setIsLoading(true);

        const result = await login(values);
        if (result?.error) {
            setLoginResult(result);
        } else {
            setLoginResult({ isSuccess: true });
            window.location.href = '/';
        }
        setIsLoading(false);
    };

    return (
        <>
            {loginResult?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{loginResult?.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="email"
                                        className="text-sky-500"
                                    >
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            autoFocus
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between">
                                        <FormLabel
                                            htmlFor="pasword"
                                            className="text-sky-500"
                                        >
                                            Mật khẩu
                                        </FormLabel>
                                        <FormDescription className="items-start">
                                            <Link
                                                href={'/forgot-password'}
                                                className="underline-offset-4 hover:underline hover:text-primary h-full text-sky-500"
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            id="password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5"
                            variant="default"
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
