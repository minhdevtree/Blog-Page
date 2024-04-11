import { siteConfig } from '@/config/site';
import LogoSite from '@/components/overview/logo-site';

const footerLinks = [
    {
        title: 'Gì đó chưa nghĩ ra',
        links: [
            '1 + 1 = 2',
            '2 + 2 = 4',
            '3 + 3 = 6',
            '4 + 4 = 8',
            '5 + 5 = 10',
        ],
    },
    {
        title: 'Tài nguyên',
        links: [
            'Thông tin trang web',
            'Trang cá nhân',
            'Trang chủ',
            'Trang đăng ký',
            'Trang đăng nhập',
        ],
    },
    {
        title: 'Chính sách',
        links: ['Chính sách', 'Điều khoản sử dụng', 'Quyền riêng tư'],
    },
    { title: 'Hỗ trợ', links: ['Facebook', 'Google', 'Youtube'] },
];

export default function FooterSite() {
    const url = siteConfig.url;

    return (
        <footer className="border-t py-10">
            <div className="mx-auto w-full max-w-none px-5 text-sm sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-between gap-x-2 gap-y-10 sm:gap-x-6 md:flex md:flex-wrap">
                    <div className="col-span-full">
                        <LogoSite />
                    </div>
                    {footerLinks.slice(0, 2).map(section => (
                        <div
                            key={section.title}
                            className=" md:flex-col gap-2.5 hidden md:flex"
                        >
                            <h3 className="mb-1 text-sm font-medium lg:text-sm">
                                {section.title}
                            </h3>
                            {section.links.map(link => (
                                <a
                                    key={link}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm "
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    ))}
                    {footerLinks.slice(2).map(section => (
                        <div
                            key={section.title}
                            className="flex flex-col gap-2.5"
                        >
                            <h3 className="mb-1 text-sm font-medium lg:text-sm">
                                {section.title}
                            </h3>
                            {section.links.map(link => (
                                <a
                                    key={link}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm "
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
