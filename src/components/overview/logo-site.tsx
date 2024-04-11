import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons/icons';

export default function LogoSite() {
    return (
        <Link
            href="/"
            className="mr-6 flex items-center space-x-2 text-sky-500"
        >
            <Icons.cloud className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
        </Link>
    );
}
