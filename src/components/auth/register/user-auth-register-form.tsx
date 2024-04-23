'use client';
import {
    EnvelopeOpenIcon,
    ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RegisterFormSchema } from '@/lib/form-schema';
import { Icons } from '@/components/icons/icons';
import { register } from '@/lib/action';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthRegisterForm({
    className,
    ...props
}: UserAuthFormProps) {
    const { push } = useRouter();
    const [registerResult, setRegisterResult] = React.useState<
        { error?: string } | undefined
    >(undefined);
    const searchParams = useSearchParams();
    const success = searchParams.get('success');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
        },
    });

    const handleRegister = async (
        values: z.infer<typeof RegisterFormSchema>
    ) => {
        setIsLoading(true);

        const result = await register(values);

        if (result.isSuccess) {
            setRegisterResult(undefined);
            push('/register?success=true');
        } else {
            setRegisterResult({ error: result.error });
        }

        setIsLoading(false);
    };

    if (success) {
        return (
            <Alert>
                <EnvelopeOpenIcon className="h-4 w-4 text-sky-500" />
                <AlertTitle className="text-sky-500">Chúc mừng</AlertTitle>
                <AlertDescription className="text-sky-500">
                    Tài khoản của bạn đã được tạo thành công. Kiểm tra email để
                    kích hoạt tài khoản.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            {registerResult?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{registerResult?.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleRegister)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sky-500">
                                        Họ và tên
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoFocus
                                            disabled={isLoading}
                                            placeholder="Họ và tên"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Tên đăng nhập"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="name@email.com"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        <Input
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
                                        <FormLabel className="text-sky-500">
                                            Mật khẩu
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
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
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
