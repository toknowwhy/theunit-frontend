'use client';

import { getMinutesToNextHour, numberWithCommas } from "@/utils/functions"
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { ReactNode } from "react"

export default function PriceRow({ 
    price, 
    nextPrice,
}: { 
    price: number,
    nextPrice: number, 
}) {

    const minutes = getMinutesToNextHour();
    const t = useVaultTranslations();
    
    return <div className="flex gap-12 md:gap-24 justify-center items-center py-6 border-y border-y-gray-dark mt-10">
        <PriceColumn title={<>{t('current-price')}</>} price={price} />
        <div className="w-px h-11 bg-gray-dark"></div>
        <PriceColumn title={<>{t('next-in')} <span className="text-primary font-semibold">{minutes}</span> {t('mins')}</>} price={nextPrice} />
    </div>
}

function PriceColumn({
    title,
    price,
} : {
    title: ReactNode,
    price: number,
}) {
    return <div>
        <div className="text-xl text-gray text-center mb-1">{title}</div>
        <div className="text-4xl text-center">Ø{numberWithCommas(price.toFixed(3))}</div>
    </div>
}
