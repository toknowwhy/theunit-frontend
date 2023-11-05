import ConnectWallet from '../web3/ConnectWallet';
import MobileMenu from './MobileMenu';
import Sidebar from './Sidebar';
import { useVaultTranslations } from '@/utils/hooks/useVaultTranslations';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
    const t = useVaultTranslations();
    return (
        <nav className="px-9 flex justify-between items-center backdrop-blur-md z-50 bg-black-light/60 border-b-gray-border fixed top-0 left-0 right-0 h-16 border-b">
            <Logo />
            <div className='flex gap-6 items-center'>
                <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} />
                <div className='lg:hidden'>
                    <MobileMenu>
                            <Sidebar />
                    </MobileMenu>
                </div>
                <div className='hidden lg:block'>
                    <LanguageSwitcher />
                </div>
                <ThemeSwitch />
            </div>
        </nav>
    )
}