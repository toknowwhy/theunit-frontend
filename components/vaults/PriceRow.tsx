import { getMinutesToNextHour } from "@/helpers/utils"
import { useTranslations } from "next-intl";
import { ReactNode } from "react"

export default function PriceRow() {

    const minutes = getMinutesToNextHour();
    const t = useTranslations("Vault");
    
    return <div className="flex gap-24 justify-center items-center py-6 border-y border-y-gray-dark mt-10">
        <PriceColumn title={<>{t('current-price')}</>} price={1287.90} />
        <div className="w-px h-11 bg-gray-dark"></div>
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
        <div className="text-xl text-gray text-center">{title}</div>
        <div className="text-4xl text-center">${price}</div>
    </div>
}