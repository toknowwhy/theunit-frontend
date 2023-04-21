'use client';

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import SplineAnim from "../../SplineAnim";
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({ 
    symbol, 
    liquidationFee 
}: {
    symbol: string,
    liquidationFee: number
}) {

    const t = useVaultTranslations();

    return <div className="flex flex-wrap items-center gap-8">
        <div className="text-4xl">{symbol} {t('vault')}</div>
        <div className="inline-block w-24 h-20">
            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-evenly">
            <VaultInfo title={t('stability-fee')} info={t('stability-fee-info')} value="0.00%" />
            <VaultInfo title={t('liquidation-fee')} info={t('liquidation-fee-info')} value="17%" />
            <VaultInfo 
                title={t('liquidation-ratio')} 
                info={t('liquidation-ratio-info')} 
                value= {(liquidationFee*100).toFixed(0)+'%'}
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