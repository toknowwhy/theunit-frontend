'use client';

import { getMinutesToNextHour } from "@/app/utils"
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { ReactNode } from "react"

export default function PriceRow({ price }: { price: number }) {

    const minutes = getMinutesToNextHour();
    const t = useVaultTranslations();
    
    return <div className="flex gap-12 md:gap-24 justify-center items-center py-6 border-y border-y-gray-dark mt-10">
        <PriceColumn title={<>{t('current-price')}</>} price={price} />
        <div className="w-px h-11 bg-gray-dark"></div>
        <PriceColumn title={<>{t('next-in')} <span className="text-primary font-semibold">{minutes}</span> {t('mins')}</>} price={price} />
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
        <div className="text-xl text-gray text-center mb-1">{title}</div>
        <div className="text-4xl text-center">Ø{price.toFixed(3)}</div>
    </div>
}
