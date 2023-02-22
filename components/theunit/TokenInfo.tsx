import { CoinTableData } from "@/app/db/types";
import { useTranslations } from "next-intl";

export default function TokenInfo({
    coin,
} : {
    coin: CoinTableData
}) {

    const t = useTranslations('Unit');

    return <>
        <div className="font-semibold text-2xl">
            {coin.name} {t('info')}
        </div>
        <div className="grid grid-cols-3">
            <TokenInfoItem title={t('the-unit-rank')} value={coin.rank} />
            <TokenInfoItem title={t('market-cap')} value={coin.market_cap} />
            <TokenInfoItem title={t('available-supply')} value={coin.circulating_supply} />
            <TokenInfoItem title={t('dominance')} value={coin.rank} />
            <TokenInfoItem title={t('volume-24')} value={coin.volume} />
            <TokenInfoItem title={t('total-supply')} value={coin.total_supply} />
        </div>
    </>
}

function TokenInfoItem ({
    title,
    value,
} : {
    title: string,
    value: string | number,
}) { 
    return <div>
        <div className="text-gray-lighter mb-2 text-sm">{title}</div>
        <div className="text-xl font-bold">{value}</div>
    </div>
}