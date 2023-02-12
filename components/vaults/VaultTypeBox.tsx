import { SUPPORTED_COINS, SUPPORTED_STABLE_COINS } from '@/helpers/constants';
import { SupportedCoin } from '@/helpers/types';
import { useTranslations, LocalizedLink } from 'next-intl';
import CoinLogo from '../CoinLogo';
import EmptySpace from '../EmptySpace';
import styles from './VaultTypeBox.module.scss';

export default function VaultTypeBox() {
    const t = useTranslations('Vault')

    return <div className={styles.container}>
        <div className={styles.title}>{t('choose-vault')}</div>
        <div className={styles.typeWrapper}>
            <VaultTypeList isStable={false} />
            <EmptySpace size='full' background='#1D1D1F' />
            <VaultTypeList />
        </div>
    </div>
}

function VaultType({coin}: {coin: SupportedCoin}) {
    const t = useTranslations('Vault')

    return <LocalizedLink href={"/vaults/"+coin.coinId} className={styles.vaultType}>
        <div>{coin.symbol}-U {t('vault')}</div>
        <div className={styles.logoWrapper}>
            <CoinLogo coinId={coin.coinId} />
        </div>
    </LocalizedLink>
}

function VaultTypeList({isStable=true}: {isStable?: boolean}) {

    const list = isStable ? SUPPORTED_STABLE_COINS : SUPPORTED_COINS;

    return <div className={styles.vaultTypeList}>
        {list.map((l) => <VaultType key={l.coinId} coin={l} />)}
    </div>
}