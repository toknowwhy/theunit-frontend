import { averageLifeExpectancyInYears, currentWorldPopulation } from "@/utils/constants";
import { CoinTableData } from "@/utils/types";
import { numberWithCommas } from "@/utils/functions";
import { useTranslations } from "next-intl";
import BoxContainer from "../BoxContainer";

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
        <BoxContainer>
            <div className="grid grid-cols-[1fr_32px_1fr] md:grid-cols-[1fr_32px_1fr_32px_1fr] px-8 py-4">
                <TokenInfoItem title={t('the-unit-rank')} value={coin.rank} />
                <div className="w-[1px] h-full bg-gray-border" />
                <TokenInfoItem title={t('market-cap')} value={infoStr(coin.market_cap)} />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block w-[1px] h-full bg-gray-border" />
                <TokenInfoItem title={t('available-supply')} value={infoStr(coin.circulating_supply)} />
                <div className="hidden md:block h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block h-[1px] w-full bg-gray-border" />
                <div className="block md:hidden w-[1px] h-full bg-gray-border" />
                <TokenInfoItem title={t('dominance')} value={dominance} />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="block md:hidden h-[1px] w-full bg-gray-border" />
                <div className="hidden md:block w-[1px] h-full bg-gray-border" />
                <TokenInfoItem title={t('volume')} value={infoStr(coin.volume)} />
                <div className="w-[1px] h-full bg-gray-border" />
                <TokenInfoItem title={t('total-supply')} value={infoStr(coin.total_supply)} />
            </div>
        </BoxContainer>
    </>
}

function TokenInfoItem ({
    title,
    value,
} : {
    title: string,
    value: string | number,
}) { 
    return <div className="py-6">
        <div className="text-gray-lighter mb-2 text-sm">{title}</div>
        <div className="text-xl font-bold">{value}</div>
    </div>
}