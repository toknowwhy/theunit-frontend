import Image from 'next/image';
import menuLogo from '@/public/menu-logo.svg';
import menuLogoDark from '@/public/icons/menu-logo-dark.svg';
import LinkContainer from './LinkContainer';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import AvailableLocales from './LanguageSwitcher';

export interface NavLink {
    link: string;
    i18n: string;
    activeKeys: string[];
}

export default function Sidebar() {

    const navLinks: NavLink[] = [
        {
            link: "/",
            i18n: "theunit",
            activeKeys: ["/", "/coins"],
        }, 
        {
            link: "/candidates",
            i18n: "candidates",
            activeKeys: ["/candidates"],
        }, 
        {
            link: "/vaults",
            i18n: "vaults",
            activeKeys: ["/vaults"],
        }, 
        {
            link: "/unit/btc",
            i18n: "oneunit",
            activeKeys: ["/unit"],
        }, 
        {
            link: "/history/1",
            i18n: "histories",
            activeKeys: ["/history"],
        },
    ];

    if (process.env.NODE_ENV === 'development') {
        navLinks.push({
            link: "/farm",
            i18n: "farm",
            activeKeys: ["/farm"],
        });
    }

    const t = useTranslations();

    return <div className="w-72 border-r border-gray-border pt-14 z-50 pl-16 h-full relative">
        {navLinks.map((link) => {
            return <LinkContainer 
                        className="mb-10 lg:mb-14 text-gray hover:text-text lg:pl-[46px]"
                        links={link.activeKeys} 
                        key={link.i18n}
                    >
                <Link 
                    key={link.i18n}
                    className='lg:group-[.is-active]:font-bold group-[.is-active]:text-white group-[.is-active]:relative'
                    href={link.link}
                >
                    <Image 
                        className="hidden absolute w-7 -left-11 lg:group-[.is-active.is-dark]:block" 
                        src={menuLogo} 
                        alt="logo" 
                    />
                    <Image 
                        className="hidden absolute w-7 -left-11 lg:group-[.is-active.is-light]:block" 
                        src={menuLogoDark} 
                        alt="logo" 
                    />
                    {t(link.i18n)}
                </Link>
            </LinkContainer>
        })}
        <div className='flex lg:hidden flex-col gap-10 mb-10 text-gray'>
            <AvailableLocales />
        </div>
        <Link 
            href="https://unitindex.org"
            className='text-center lg:absolute lg:bottom-24 lg:left-0 lg:right-0 text-gray hover:text-gradient inline-block'
        >
            {t('goto-theunit')}
        </Link>
    </div>;
}