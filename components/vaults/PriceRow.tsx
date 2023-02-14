import { getMinutesToNextHour } from "@/helpers/utils"
import { useTranslations } from "next-intl";
import { ReactNode } from "react"
import Divider from "../Divider";
import EmptySpace from "../EmptySpace";
import styles from './PriceRow.module.scss';

export default function PriceRow() {

    const minutes = getMinutesToNextHour();
    const t = useTranslations("Vault");
    
    return <div className={styles.row}>
        <PriceColumn title={<>{t('current-price')}</>} price={1287.90} />
        <Divider size="44px" />
        <PriceColumn title={<>{t('next-in')} <span className="primary-color">{minutes}</span> {t('mins')}</>} price={1287.90} />
    </div>
}

function PriceColumn({
    title,
    price
} : {
    title: ReactNode,
    price: number
}) {
    return <div>
        <div className="text-md grey text-center">{title}</div>
        <div className="text-xl text-center">${price}</div>
    </div>
}