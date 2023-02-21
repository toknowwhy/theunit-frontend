'use client';

import {usePathname} from 'next-intl/client';
import { NavLink } from './MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import menuLogo from '@/public/menu-logo.svg';

export default function Sidebar({ 
    navLinks,
    locale
} : { 
    navLinks: NavLink[],
    locale: string
}) {

    const pathname = usePathname();

    return <div className="fixed left-0 bottom-0 top-16 w-72 border-r border-gray-dark pt-14 z-50">
        <div className="m-0 flex flex-col pl-16 gap-y-14">
            {navLinks.map((link) => {
                const active = pathname === link.link || pathname?.startsWith(link.link + '/');
                return <Link 
                    key={link.i18n}
                    className={active ? 'text-text font-bold relative flex items-center gap-4' : 'text-gray hover:text-text pl-[46px]'}
                    href={locale === 'en' ? link.link : `/${locale}${link.link}`}
                >
                    {active && <Image src={menuLogo} alt="logo" />} {link.label}
                </Link> 
            })}
        </div>
    </div>;
}