import { SupportedCoin } from "@/helpers/types";
import { useTranslations } from "next-intl";
import SplineAnim from "../SplineAnim";
import styles from './VaultHeader.module.scss';
import VaultInfoTitle from "./VaultInfoTitle";

export default function VaultHeader({coin}: {coin: SupportedCoin}) {
    const t = useTranslations("Vault");

    return <div className={styles.wrapper}>
        <div className="page-title">{coin.symbol} {t('vault')}</div>
        <div className={styles.spline}>
            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
        </div>
        <VaultInfo title={t('vault-id')} info={t('vault-id-info')} value="TBD" />
        <VaultInfo title={t('stability-fee')} info={t('stability-fee-info')} value="0.00%" />
        <VaultInfo title={t('liquidation-fee')} info={t('liquidation-fee-info')} value="17%" />
        <VaultInfo title={t('liquidation-ratio')} info={t('liquidation-ratio-info')} value="120%" />
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
        <div className="text-md">{value}</div>
    </div>
}