import {useTranslations} from 'next-intl';
import styles from './page.module.css'

export default function Home() {
  const t = useTranslations('Menu');
  return <h1>{t('the-unit')}</h1>;
}
