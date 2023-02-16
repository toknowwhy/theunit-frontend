import { SUPPORTED_COINS, SUPPORTED_STABLE_COINS } from '@/helpers/constants';
import { SupportedCoin } from '@/helpers/types';
import { useTranslations, LocalizedLink } from 'next-intl';
import CoinLogo from '../CoinLogo';

export default function VaultTypeBox() {
    const t = useTranslations('Vault')

    return <div className="w-full max-w-2xl mx-auto bg-gray-darker border border-gray rounded-lg px-8 py-10 mt-24">
        <div className="mb-10 text-2xl">{t('choose-vault')}</div>
        <div className="grid grid-cols-[1fr_1px_1fr] gap-8">
            <VaultTypeList isStable={false} />
            <div className="w-px h-full bg-gray-dark"></div>
            <VaultTypeList />
        </div>
    </div>
}

function VaultType({coin}: {coin: SupportedCoin}) {
    const t = useTranslations('Vault')

    return <LocalizedLink href={"/vaults/"+coin.coinId} className="flex items-center justify-between cursor-pointer px-3 py-2 text-xl rounded hover:bg-gray-dark">
        <div>{coin.symbol}-U {t('vault')}</div>
        <div className="w-8 h-8 bg-white p-1 rounded-3xl">
            <CoinLogo coinId={coin.coinId} />
        </div>
    </LocalizedLink>
}

function VaultTypeList({isStable=true}: {isStable?: boolean}) {

    const list = isStable ? SUPPORTED_STABLE_COINS : SUPPORTED_COINS;

    return <div className="flex flex-col gap-8">
        {list.map((l) => <VaultType key={l.coinId} coin={l} />)}
    </div>
}