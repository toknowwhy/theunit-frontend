import { VaultProp } from "@/app/types";
import SplineAnim from "../SplineAnim";
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({ collateral, t }: VaultProp) {

    return <div className="flex justify-between">
        <div className="text-4xl">{collateral.symbol} {t['vault']}</div>
        <div className="w-32">
            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
        </div>
        <VaultInfo title={t['vault-id']} info={t['vault-id-info']} value="TBD" />
        <VaultInfo title={t['stability-fee']} info={t['stability-fee-info']} value="0.00%" />
        <VaultInfo title={t['liquidation-fee']} info={t['liquidation-fee-info']} value="17%" />
        <VaultInfo title={t['liquidation-ratio']} info={t['liquidation-ratio-info']} value="120%" />
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