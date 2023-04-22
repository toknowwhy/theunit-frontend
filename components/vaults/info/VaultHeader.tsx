'use client';

import { LIQUIDATION_SAFE_RATIO } from "@/utils/constants";
import { getRatioFromLiquidationFee } from "@/utils/functions";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import SplineAnim from "../../SplineAnim";
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({ 
    symbol, 
    liquidationFee,
    minUnit, 
}: {
    symbol: string,
    liquidationFee: number,
    minUnit: number,
}) {

    const t = useVaultTranslations();

    return <div className="flex flex-wrap items-center gap-8">
        <div className="text-4xl">{symbol} {t('vault')}</div>
        <div className="inline-block w-24 h-20">
            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-evenly">
            <VaultInfo 
                title={t('stability-fee')} 
                info={t('stability-fee-info')} 
                value="0.00%" 
            />
            <VaultInfo 
                title={t('liquidation-fee')} 
                info={t('liquidation-fee-info')} 
                value={(getRatioFromLiquidationFee(liquidationFee, true)*100).toFixed(0)+'%'} 
            />
            <VaultInfo 
                title={t('liquidation-ratio')} 
                info={t('liquidation-ratio-info')} 
                value={(getRatioFromLiquidationFee(liquidationFee)*100).toFixed(0)+'%'} 
            />
            <VaultInfo 
                title={t('unit-limit')} 
                info={t('unit-limit-info')} 
                value={minUnit.toString()}
            />
        </div>
    </div>
}

function VaultInfo({
    title,
    info,
    value,
} : {
    title: string,
    info?: string,
    value: string
}) {
    return <div>
        <VaultInfoTitle title={title} info={info} />
        <div className="text-xl">{value}</div>
    </div>
}