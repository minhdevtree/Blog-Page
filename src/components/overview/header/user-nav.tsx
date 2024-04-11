import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/action';
import Link from 'next/link';

export function UserNav({ session }: { session: any }) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className=" border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                            <AvatarImage
                                src={session.user.img || '/avatar/noavatar.png'}
                                alt="picture"
                            />
                            <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user.fullName || 'User'}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user.email || 'Email'}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={'/profile'}>Trang cá nhân</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <form action={logout} className="w-full">
                            <Button
                                variant="hidden"
                                type="submit"
                                onClick={logout}
                                className="p-0 h-[1.25rem] w-full flex items-start justify-start "
                            >
                                Đăng xuất
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
