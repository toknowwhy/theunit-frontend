import { averageLifeExpectancyInYears, currentWorldPopulation } from "@/utils/constants";
import { CoinTableData } from "@/utils/types";
import { numberWithCommas } from "@/utils/functions";
import { useTranslations } from "next-intl";

export default function TokenInfo({
    coin,
} : {
    coin: CoinTableData
}) {

    const t = useTranslations('TheUnit');

    const dominance = ((coin.market_cap / (averageLifeExpectancyInYears * currentWorldPopulation)) * 100).toFixed(3) + '%';

    const infoStr = (value: number | null | undefined) => {
        return value ? numberWithCommas(value.toFixed(0)) : 'NA';
    }

    return <>
        <div className="font-semibold text-2xl mt-12 mb-6">
            {coin.name} {t('info')}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10">
            <TokenInfoItem title={t('the-unit-rank')} value={coin.rank} />
            <TokenInfoItem title={t('market-cap')} value={infoStr(coin.market_cap)} />
            <TokenInfoItem title={t('available-supply')} value={infoStr(coin.circulating_supply)} />
            <TokenInfoItem title={t('dominance')} value={dominance} />
            <TokenInfoItem title={t('volume')} value={infoStr(coin.volume)} />
            <TokenInfoItem title={t('total-supply')} value={infoStr(coin.total_supply)} />
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