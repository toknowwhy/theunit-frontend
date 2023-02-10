import Image from 'next/image';
import styles from './Header.module.scss';
import logo from '@/public/logo.svg';
import ConnectWallet from '../button/ConnectWallet';

export default function Header() {
    return (<div className={styles.header}>
        <Image src={logo} alt="" />
        <ConnectWallet />
    </div>)
}