import Image from 'next/image';
import styles from './Header.module.scss';
import logo from '@/public/logo.svg';

export default function Header() {
    return (<div className={styles.header}>
        <Image src={logo} alt="" />
    </div>)
}