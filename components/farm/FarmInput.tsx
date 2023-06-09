'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations"

export default function FarmInput({
    value,
    onChange,
    onMax,
    isActive = false,
} : {
    value: string,
    onChange: (val: string) => void,
    onMax: () => void,
    isActive?: boolean,
}) {

    const t = useVaultTranslations()

    return (
        <div className={"relative " + (isActive ? 'bgd-gradient p-[1px]' : '')}>
            <input 
                className={"pl-4 pr-20 py-5 w-full placeholder:text-gray-medium placeholder:font-bold focus:outline-none text-2xl rounded-lg bg-transparent border border-gray-border"} 
                placeholder={t('lock-amount')}
                type="number"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <div className="absolute top-0 right-4 bottom-0 cursor-pointer py-5 text-gray-medium text-2xl" onClick={onMax}>
                {t('max')}
            </div>

        </div>
    )
}