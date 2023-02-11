import Image from 'next/image';
import {useTranslations} from 'next-intl';
import styles from './Header.module.scss';
import logo from '@/public/logo.svg';
import ConnectWallet from '../button/ConnectWallet';

export default function Header() {
    const t = useTranslations('Web3');
    return (<div className={styles.header}>
        <Image src={logo} alt="" />
        <ConnectWallet label={t('connect-wallet')} />
    </div>)
}