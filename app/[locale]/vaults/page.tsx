import BoxContainer from "@/components/BoxContainer";
import Button from "@/components/button/Button";
import SplineAnim from "@/components/SplineAnim";
import { supportedCollaterals } from "@/crypto/config";
import { CollateralDesc } from "@/utils/types";
import { useTranslations } from "next-intl";

export default function VaultsPage() {

    return (
        <div className="grid grid-cols-3">
            {supportedCollaterals.map((collateral) => (
                <VaultChoice
                    key={collateral.symbol}
                    collateral={collateral}
                />
            ))}
        </div>
    )
}

function VaultChoice({
    collateral,
} : {
    collateral: CollateralDesc,
}) {
    const t = useTranslations('Vault');

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="flex justify-between items-center">
                    <div className="text-4xl font-semibold">{collateral.symbol.toUpperCase()}-TINU</div>
                    <div className="w-32 h-36">
                        <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
                    </div>
                </div>
                <VaultChoiceInfo title={t('liquidation-ratio')} info={collateral.liquidationRatio.toString()} />
                <VaultChoiceInfo title={t('liquidation-ratio')} info={collateral.liquidationRatio.toString()} />
                <VaultChoiceInfo title={t('liquidation-ratio')} info={collateral.liquidationRatio.toString()} />
                <Button>
                    {t('enter-vault')}
                </Button>
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
        <div className="flex items-center justify-between">
            <div>{title}</div>
            <div>{info}</div>
        </div>
    )
}