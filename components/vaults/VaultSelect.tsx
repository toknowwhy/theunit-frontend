import BoxContainer from "@/components/BoxContainer";
import SplineAnim from "@/components/SplineAnim";
import { supportedCollaterals } from "@/crypto/config";
import { formatRatio } from "@/utils/functions";
import { CollateralDesc } from "@/utils/types";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

export default function VaultsSelect({
    isFarm = false,
} : {
    isFarm?: boolean,
}) {

    return (
        <div className="grid grid-cols-3">
            {supportedCollaterals.map((collateral) => (
                <VaultChoice
                    key={collateral.symbol}
                    collateral={collateral}
                    isFarm={isFarm}
                />
            ))}
        </div>
    )
}

function VaultChoice({
    collateral,
    isFarm,
} : {
    collateral: CollateralDesc,
    isFarm: boolean,
}) {
    const t = useTranslations('Vault');

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="flex justify-between items-center mb-8 gap-8">
                    <div>
                        <div className="text-4xl font-semibold">
                            {collateral.symbol.toUpperCase()}-TINU
                        </div>
                        <div className="text-gray-medium leading-5">{t('eth-vault-description')}</div>
                    </div>
                    <div className="w-24 h-28">
                        <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
                    </div>
                </div>
                <VaultChoiceInfo title={t('liquidation-ratio')} info={formatRatio(collateral.liquidationRatio)} />
                <VaultChoiceInfo title={t('unit-limit')} info={collateral.dustLimit.toString()} />
                <VaultChoiceInfo title={t('stability-fee')} info='0.00%' />
                <Link 
                    href={`/${isFarm ? 'farm' : 'vaults'}/${collateral.symbol}`} 
                    className="block mt-8 py-3 rounded-lg bg-gray-border text-center font-semibold hover:bg-transparent border border-gray-border" 
                >
                        {t(isFarm ? 'start-farm' : 'enter-vault')}
                </Link>
            </div>
        </BoxContainer>
    )
}

function VaultChoiceInfo({
    title,
    info,
} : {
    title: string,
    info: string,
}) {
    return (
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-medium">{title}</div>
            <div>{info}</div>
        </div>
    )
}