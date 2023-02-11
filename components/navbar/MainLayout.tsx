import {useLocale, useTranslations} from 'next-intl';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.scss';
import { ReactNode } from 'react';

export interface NavLink {
    label: string;
    link: string;
    i18n: string;
}

const navLinks: NavLink[] = [{
    label: "The Unit",
    link: "/",
    i18n: "theunit",
}, {
    label: "Vaults",
    link: "/vaults",
    i18n: "vaults",
}, {
    label: "Candidates",
    link: "/candidates",
    i18n: "candidates",
}, {
    label: "One Unit",
    link: "/one-unit",
    i18n: "oneunit",
}, {
    label: "History",
    link: "/histories",
    i18n: "histories",
}];

export default function MainLayout({children} : {children: ReactNode}) {
    const locale = useLocale();
    const t = useTranslations('Menu');
    const localizedLinks = navLinks.map((link) => { 
       return { ...link, label: t(link.i18n) }
    });

    return <>
        <Header />
        <Sidebar navLinks={localizedLinks} locale={locale} />
        <div className={styles.body}>
            {children}
        </div>
    </>
}