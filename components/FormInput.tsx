'use client';

import { numberWithCommas } from "@/utils/functions";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import TokenBalance from "./vaults/form/TokenBalance";

export default function FormInput({
    value,
    onChange,
    onMax,
    unitPrice,
    symbol,
    balance,
} : {
    value: string,
    onChange: (value: string) => void;
    onMax?: () => void,
    unitPrice?: number,
    symbol: string,
    balance?: number,
}) {

    const t = useVaultTranslations()

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };

    return <div className="relative px-4 bg-gray-dark/60 h-16 flex flex-col justify-center rounded-lg border border-gray-border">
            <input 
                value={value}
                type="number"
                min={0}
                onChange={onInputChange}
                className="pr-20 text-text text-xl border-none bg-transparent outline-none placeholder:text-gray placeholder:font-semibold" 
                placeholder={t('input-amount', {symbol})} 
            />
            { unitPrice && <div className="text-gray text-xs">
                    ~{value && !isNaN(parseFloat(value)) ? numberWithCommas((unitPrice * parseFloat(value)).toString()) : '0'} UNIT
                </div>
            }
            {Boolean(onMax) && <div className="absolute top-0 right-4 bottom-0 cursor-pointer py-5 text-gray-medium text-xl" onClick={onMax}>
                {t('max')}
            </div>}
            {Boolean(balance) && (
                <div className="absolute right-0 -top-8">
                    <TokenBalance balance={balance} />
                </div>
            )}
        </div>
}