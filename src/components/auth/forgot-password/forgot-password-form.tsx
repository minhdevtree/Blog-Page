'use client';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CheckCircleIcon } from 'lucide-react';
import { Icons } from '@/components/icons/icons';
import { sendEmailActivateSchema } from '@/lib/form-schema';
import { sendEmailForgotPassword } from '@/lib/action';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isPending, setIsPending] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<
        { error?: string; isSuccess: boolean } | undefined
    >(undefined);
    const form = useForm<z.infer<typeof sendEmailActivateSchema>>({
        resolver: zodResolver(sendEmailActivateSchema),
        defaultValues: {
            email: '',
        },
    });

    async function sendRequestEmail(
        values: z.infer<typeof sendEmailActivateSchema>
    ) {
        setIsLoading(true);
        setIsPending(true);

        const res = await sendEmailForgotPassword(values);
        if (!res.isSuccess) {
            setIsPending(false);
        }
        setResult(res);
        setIsLoading(false);
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            {result?.isSuccess && (
                <Alert variant="default">
                    <CheckCircleIcon className="h-4 w-4" />
                    <AlertTitle>Thành công</AlertTitle>
                    <AlertDescription>
                        Kiểm tra email của bạn để đổi mật khẩu.
                    </AlertDescription>
                </Alert>
            )}
            {!result?.isSuccess && result?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{result?.error}</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(sendRequestEmail)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoFocus
                                            disabled={isLoading}
                                            placeholder="Email của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading || isPending}>
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Gửi
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
