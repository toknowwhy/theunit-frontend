import Image from 'next/image';
import menuLogo from '@/public/menu-logo.svg';
import LinkContainer from './LinkContainer';
import { Link, useTranslations } from 'next-intl';

export interface NavLink {
    link: string;
    i18n: string;
    activeKeys: string[];
}

export default function Sidebar() {

    const navLinks: NavLink[] = [{
        link: "/",
        i18n: "theunit",
        activeKeys: ["/", "/coins"],
    }, {
        link: "/vaults/ETH",
        i18n: "vaults",
        activeKeys: ["/vaults"],
    }, {
        link: "/candidates",
        i18n: "candidates",
        activeKeys: ["/candidates"],
    }, {
        link: "/unit/btc",
        i18n: "oneunit",
        activeKeys: ["/unit"],
    }, {
        link: "/history/1",
        i18n: "histories",
        activeKeys: ["/history"],
    }];

    const t = useTranslations();

    return <div className="w-72 border-r border-gray-dark pt-14 z-50 pl-16 h-full relative">
        {navLinks.map((link) => {
            return <LinkContainer 
                        className="mb-14 text-gray hover:text-text pl-[46px]"
                        links={link.activeKeys} 
                        key={link.i18n}
                    >
                <Link 
                    key={link.i18n}
                    className='group-[.is-active]:font-semibold group-[.is-active]:text-text group-[.is-active]:relative'
                    href={link.link}
                >
                    <Image 
                        className="hidden absolute w-7 -left-11 group-[.is-active]:block" 
                        src={menuLogo} 
                        alt="logo" 
                    />
                    {t(link.i18n)}
                </Link>
            </LinkContainer>
        })}
        <Link 
            href="https://theunit.one"
            className='text-center absolute bottom-24 left-0 right-0 text-gray'
        >
            {t('goto-theunit')}
        </Link>
    </div>;
}