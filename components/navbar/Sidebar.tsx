'use client';

import {usePathname} from 'next-intl/client';
import { NavLink } from './MainLayout';
import Link from 'next/link';

export default function Sidebar({ 
    navLinks,
    locale
} : { 
    navLinks: NavLink[],
    locale: string
}) {

    const pathname = usePathname();

    return <div className="fixed left-0 bottom-0 top-16 w-72 border-r border-gray-dark pt-14">
        <div className="m-0 flex flex-col pl-24 gap-y-14">
            {navLinks.map((link) => {
                const active = pathname === link.link || pathname?.startsWith(link.link + '/');
                return <Link 
                    key={link.i18n}
                    className={active ? 'text-text font-bold before:content-[url(/menu-logo.svg)] before:mr-4 relative before:absolute before:top-[-0.2rem] before:left-[-3rem]' : 'text-gray hover:text-text'}
                    href={locale === 'en' ? link.link : `/${locale}${link.link}`}
                >
                    {link.label}
                </Link> 
            })}
        </div>
    </div>;
}