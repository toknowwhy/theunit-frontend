import BoxContainer from "@/components/BoxContainer";
import Button from "@/components/button/Button";
import SplineAnim from "@/components/SplineAnim";
import { supportedCollaterals } from "@/crypto/config";
import { useTranslations } from "next-intl";

export default function VaultsPage() {

    const symbols = supportedCollaterals.map((col) => col.symbol)

    return (
        <div className="grid grid-cols-3">
            {symbols.map((symbol) => (
                <VaultChoice
                    key={symbol}
                    symbol={symbol}
                />
            ))}
        </div>
    )
}

function VaultChoice({
    symbol,
} : {
    symbol: string,
}) {
    const t = useTranslations('Vault');

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold">{symbol.toUpperCase()}</div>
                    <div className="w-32 h-36">
                        <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
                    </div>
                </div>
                <Button>
                    {t('enter-vault')}
                </Button>
            </div>
        </BoxContainer>
    )
}