'use client';
import {
    EnvelopeOpenIcon,
    ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { useForm } from 'react-hook-form';
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
import { sendEmailActivateSchema } from '@/lib/form-schema';
import { Icons } from '@/components/icons/icons';
import { sendEmailActivate } from '@/lib/action';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UserAuthSendEmailActivate() {
    const router = useRouter();
    const [result, setResult] = React.useState<{ error?: string } | undefined>(
        undefined
    );
    const searchParams = useSearchParams();
    const success = searchParams.get('success');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof sendEmailActivateSchema>>({
        resolver: zodResolver(sendEmailActivateSchema),
        defaultValues: {
            email: '',
        },
    });

    const handleSendEmailActivate = async (
        values: z.infer<typeof sendEmailActivateSchema>
    ) => {
        setIsLoading(true);

        const result = await sendEmailActivate(values);

        if (result.isSuccess) {
            setResult(undefined);
            router.push('/send-email-activate?success=true');
        } else {
            setResult({ error: result.error });
        }

        setIsLoading(false);
    };
    if (success) {
        return (
            <Alert>
                <EnvelopeOpenIcon className="h-4 w-4 text-sky-500" />
                <AlertTitle className="text-sky-500">Chúc mừng</AlertTitle>
                <AlertDescription className="text-sky-500">
                    Email kích hoạt đã được gửi, vui lòng kiểm tra hộp thư đến
                    hoặc thư rác
                </AlertDescription>
            </Alert>
        );
    }
    return (
        <div className="grid gap-6">
            {result?.error && (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{result?.error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSendEmailActivate)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
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

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="mt-5"
                        >
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
