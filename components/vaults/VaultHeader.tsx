import { VaultProp } from "@/app/types";
import SplineAnim from "../SplineAnim";
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({ collateral, t }: VaultProp) {

    return <div className="flex items-center gap-8">
        <span className="text-4xl">{collateral.symbol} {t['vault']}</span>
        <div className="inline-block w-24 h-20">
            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
        </div>
        <div className="grid grid-cols-4 gap-8 justify-evenly">
            <VaultInfo title={t['vault-id']} info={t['vault-id-info']} value="TBD" />
            <VaultInfo title={t['stability-fee']} info={t['stability-fee-info']} value="0.00%" />
            <VaultInfo title={t['liquidation-fee']} info={t['liquidation-fee-info']} value="17%" />
            <VaultInfo title={t['liquidation-ratio']} info={t['liquidation-ratio-info']} value="120%" />
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