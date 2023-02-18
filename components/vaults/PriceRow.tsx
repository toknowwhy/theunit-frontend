import { VaultProp } from "@/app/types";
import { getMinutesToNextHour } from "@/app/utils"
import { ReactNode } from "react"

export default function PriceRow({
    t,
} : VaultProp) {

    const minutes = getMinutesToNextHour();
    
    return <div className="flex gap-24 justify-center items-center py-6 border-y border-y-gray-dark mt-10">
        <PriceColumn title={<>{t['current-price']}</>} price={1287.90} />
        <div className="w-px h-11 bg-gray-dark"></div>
        <PriceColumn title={<>{t['next-in']} <span className="text-primary font-semibold">{minutes}</span> {t['mins']}</>} price={1287.90} />
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
        <div className="text-4xl text-center">${price}</div>
    </div>
}