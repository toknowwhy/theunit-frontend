import Image from 'next/image';
import {useTranslations} from 'next-intl';
import logo from '@/public/logo.svg';
import ConnectWallet from '../button/ConnectWallet';

export default function Header() {
    const t = useTranslations('Web3');
    return (<div className="px-9 flex justify-between items-center backdrop-blur-md z-50 bg-[#090909]/90 border-b-gray-dark fixed top-0 left-0 right-0 h-16 border-b">
        <Image src={logo} alt="" />
        <ConnectWallet label={t('connect-wallet')} />
    </div>)
}