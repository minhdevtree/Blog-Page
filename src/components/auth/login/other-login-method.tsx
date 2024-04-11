'use client';

import { AlertLoginGithub } from './alert-login-github';
import { AlertLoginGoogle } from './alert-login-google';

export default function OtherLoginMethod() {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Hoặc đăng nhập bằng
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
                <AlertLoginGoogle />
                <AlertLoginGithub />
            </div>
        </>
    );
}
