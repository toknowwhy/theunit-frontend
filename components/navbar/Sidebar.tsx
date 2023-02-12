'use client';

import {useUnlocalizedPathname} from 'next-intl/client';
import { NavLink } from './MainLayout';
import styles from './Sidebar.module.scss';
import menuLogo from '@/public/menu-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar({ 
    navLinks,
    locale
} : { 
    navLinks: NavLink[],
    locale: string
}) {

    const pathname = useUnlocalizedPathname();

    return <div className={styles.sidebar}>
        <ul className={styles.menu}>
            {navLinks.map((link) => {
                const active = pathname === link.link || pathname?.startsWith(link.link + '/');
                return <li key={link.link} className={active ? styles.linkActive : ''}>
                {active && <Image className={styles.menuLogo} src={menuLogo} alt="logo" />}
                <Link href={`/${locale}${link.link}`}>{link.label}</Link> 
            </li>
            })}
        </ul>
    </div>;
}