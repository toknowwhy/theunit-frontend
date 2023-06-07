'use client';

import { 
    formatRatio,
    getMinutesToNextHour, 
    getRatioFromLiquidationFee, 
    numberWithCommas 
} from "@/utils/functions";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { TransType } from "@/utils/types";
import SplineAnim from "../../SplineAnim";
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({ 
    symbol, 
    liquidationFee,
    minUnit, 
    price, 
    nextPrice,
}: {
    symbol: string,
    liquidationFee: number,
    minUnit: number,
    price: number,
    nextPrice: number, 
}) {

    const t = useVaultTranslations();
    const minutes = getMinutesToNextHour();

    return <div className="flex flex-wrap items-center border-b border-b-gray-border pb-8 gap-4 justify-between">
        <div className="flex-none flex items-center">
            <div className="flex-none text-4xl font-bold">{symbol} {t('vault')}</div>
            <div className="flex-none w-24 h-20">
                <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
            </div>
        </div>
        <VaultInfo 
            title={t('current-price')} 
            info={t('current-price-info')} 
            value={`Ø${numberWithCommas(price.toFixed(3))}`}
        />
        <VaultInfo 
            title={t.rich('next-in', {mins: minutes, bold: (chunks) => <strong>&nbsp;{chunks}&nbsp;</strong>})} 
            info={t('next-in-info')} 
            value={`Ø${numberWithCommas(nextPrice.toFixed(3))}`}
        />
        <VaultInfo 
            title={t('liquidation-ratio')} 
            info={t('liquidation-ratio-info')} 
            value={formatRatio(getRatioFromLiquidationFee(liquidationFee))} 
        />
        <VaultInfo 
            title={t('unit-limit')} 
            info={t('unit-limit-info')} 
            value={'Ø'+minUnit}
        />
    </div>
}

export function VaultInfo({
    title,
    info,
    value,
} : {
    title: TransType,
    info?: string,
    value: string
}) {
    return <div>
        <VaultInfoTitle title={title} info={info} />
        <div className="text-2xl font-bold">{value}</div>
    </div>
}