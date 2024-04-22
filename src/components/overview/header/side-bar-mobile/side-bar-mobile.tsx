import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { CategoryListMobile } from './category-list-mobile';
import { logout } from '@/lib/action';
import { Category } from '@/lib/define';
import { ModeToggle } from '../mode-toggle';

type PageProps = {
    label: string;
    path: string;
};

const pages: PageProps[] = [
    {
        label: 'Thông tin website',
        path: '/about-us',
    },
];

export function SideBarMobile({
    categories,
    session,
}: {
    categories: Category[];
    session: any;
}) {
    if (!session) {
        return (
            <Button asChild>
                <Link href={'/login'}>Đăng nhập</Link>
            </Button>
        );
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="hidden">
                    <HamburgerMenuIcon className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col ">
                <div>
                    {session && (
                        <SheetHeader>
                            <SheetTitle className="flex justify-center">
                                <Avatar className="h-[80px] w-[80px] border-[3px] border-sky-500">
                                    <AvatarImage
                                        src={
                                            session.user.img ||
                                            '/avatar/noavatar.png'
                                        }
                                        alt="avatar picture"
                                        width={100}
                                        height={100}
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            </SheetTitle>
                            <SheetDescription>
                                {session.user.fullName}
                            </SheetDescription>
                        </SheetHeader>
                    )}
                    <div className="flex justify-center my-2">
                        <ModeToggle />
                    </div>

                    <div className="flex flex-col justify-center">
                        {pages.map(page => (
                            <Link
                                key={page.path}
                                href={page.path}
                                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                            >
                                <>
                                    <div className="text-center">
                                        <Separator className="my-2" />
                                        {page.label}

                                        <Separator className="my-2" />
                                    </div>
                                </>
                            </Link>
                        ))}
                    </div>
                    <CategoryListMobile categories={categories} />
                </div>
                <div className="text-center">
                    <form action={logout}>
                        <Button>Đăng xuất</Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
