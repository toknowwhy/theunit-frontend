import Link from 'next/link';
import styles from './Sidebar.module.scss';

const navLinks = [{
    label: "The Unit",
    link: "the-unit"
}, {
    label: "Vaults",
    link: "vaults"
}, {
    label: "Candidates",
    link: "candidates"
}, {
    label: "One Unit",
    link: "one-unit"
}, {
    label: "History",
    link: "histories"
}]

export default function Sidebar() {
    return <div className={styles.sidebar}>
        <ul className={styles.menu}>
            {navLinks.map((link) => <li key={link.link}>
                <Link href={link.link}>{link.label}</Link> 
            </li>)}
        </ul>
    </div>;
}