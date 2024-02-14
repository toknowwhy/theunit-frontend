import MobileMenu from './MobileMenu';
import Sidebar from './Sidebar';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
    return (
        <nav className="px-9 flex justify-between items-center backdrop-blur-md z-50 bg-black-light/60 border-b-gray-border fixed top-0 left-0 right-0 h-16 border-b">
            <Logo />
            <div className='flex gap-6 items-center'>
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