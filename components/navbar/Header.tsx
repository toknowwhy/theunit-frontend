import Image from 'next/image';
import {Link, useTranslations} from 'next-intl';
import logo from '@/public/logo.svg';
import logoSmall from '@/public/logo-small.svg';
import ConnectWallet from '../button/ConnectWallet';
import MobileMenu from './MobileMenu';
import Sidebar from './Sidebar';

export default function Header() {
    const t = useTranslations('Vault');
    return (<div className="px-9 flex justify-between items-center backdrop-blur-md z-50 bg-[#090909]/90 border-b-gray-dark fixed top-0 left-0 right-0 h-16 border-b">
        <Link href="/">
            <div className='md:hidden'><Image src={logoSmall} alt="" /></div>
            <div className='hidden md:block'><Image src={logo} alt="" /></div>
        </Link>
        <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} />
        <div className='lg:hidden'>
            <MobileMenu>
                <Sidebar />
            </MobileMenu>
        </div>
    </div>)
}