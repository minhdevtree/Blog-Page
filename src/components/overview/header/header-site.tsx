import LogoSite from '@/components/overview/logo-site';
import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import { SideBarMobile } from './side-bar-mobile/side-bar-mobile';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { ModeToggle } from './mode-toggle';
import CategoryList from './category-list';
import { getCategories } from '@/lib/data';

export default async function HeaderSite() {
    const session = await auth();
    const categories = await getCategories();
    return (
        <header className="md:px-12 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 relative">
                <div className="md:mr-4 md:flex">
                    <LogoSite />
                    <CategoryList categories={categories} />
                </div>

                <div className="ml-auto hidden sm:block">
                    <div className="flex items-center space-x-4 ">
                        <MainNav className="mx-6 hidden lg:flex" />
                        <ModeToggle />

                        {session ? (
                            <UserNav session={session} />
                        ) : (
                            <Button asChild>
                                <Link href={'/login'}>Đăng nhập</Link>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="ml-auto block sm:hidden">
                    <SideBarMobile categories={categories} session={session} />
                </div>
            </div>
        </header>
    );
}
