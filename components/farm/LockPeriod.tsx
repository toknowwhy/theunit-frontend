'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { LockAPY } from "@/utils/types";
import GradientBorder from "../GradientBorder";

export default function LockPeriods({
    apys,
    selected,
    setSelected,
} : {
    apys: LockAPY[],
    selected: number,
    setSelected: (month: number) => void,
}) {

    const t = useVaultTranslations()

    return (
        <div className="flex justify-stretch gap-4">
            {apys.map((apy) => (
                <GradientBorder 
                    key={apy.months} 
                    active={selected == apy.months}
                    className="flex-grow"
                >
                    <div 
                        className="py-4 px-2 cursor-pointer text-center"
                        onClick={() => { setSelected(apy.months) }}
                    >
                        <div className="inline-block text-gradient font-semibold">{(apy.apy * 100).toFixed(2)}%</div>
                        <div className="text-white text-base">{t('months', {num: apy.months})}</div>
                    </div>
                </GradientBorder>
            ))}
        </div>
    )
}