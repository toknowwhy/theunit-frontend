'use client';

import { minUnitToMint } from "@/app/constants";
import { VaultActionType, VaultProp } from "@/app/types";
import { useMyBalance } from "@/crypto/hooks/useMyBalance";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { useState } from "react";
import Button from "../button/Button";
import ActionTab from "./ActionTab";
import VaultInfoBox from "./VaultInfoBox";
import VaultInput from "./VaultInput";

export default function VaultForm({
    id,
    collateral,
    price,
} : VaultProp) {

    const isManage = id != null;
    const symbol = collateral.symbol;

    const t = useVaultTranslations();

    const [collateralAction, setCollateralAction] = useState<VaultActionType>('deposit');
    const [unitAction, setUnitAction] = useState<VaultActionType>('mint');
    const [collateralValue, setCollateralValue] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');
    const [error, setError] = useState('');

    const myBalance = useMyBalance();

    const onUnitAmountChange = (value: string) => {
        setUnitValue(value);
    }

    const onCollateralAmountChange = (value: string) => {
        setCollateralValue(value);
        const uv = price * parseFloat(value);
        setUnitValue(`${uv}`);
        if (parseFloat(value) > myBalance) {
            setError(t('not-enough-balance'))
        } else if (uv < minUnitToMint) {
            setError(t('not-enough-unit', {num: minUnitToMint}))
        } else {
            setError('')
        }
    }


    return <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-8 mt-10">
        <div>
            <div className="text-2xl font-bold mb-6">
                { isManage ? t('manage') : t('create')}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border">
                <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px] mb-4">
                    <ActionTab 
                        active={collateralAction == 'deposit'} 
                        title={t('deposit', {symbol})} 
                        onClick={() => { setCollateralAction('deposit') }} 
                    />
                    <ActionTab 
                        active={collateralAction == 'withdraw'} 
                        title={t('withdraw', {symbol})} 
                        onClick={() => { setCollateralAction('withdraw') }} 
                    />
                </div>
                <VaultInput 
                    symbol={collateral.symbol} 
                    onChange={onCollateralAmountChange} 
                    value={collateralValue} 
                    unitPrice={1280.0}
                />
                <div className="h-8"></div>
                <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px] mb-4">
                    <ActionTab 
                        active={unitAction == 'mint'} 
                        title={t('mint')} 
                        onClick={() => { setUnitAction('mint') }} 
                    />
                    <ActionTab 
                        active={unitAction == 'burn'} 
                        title={t('burn')} 
                        onClick={() => { setUnitAction('burn') }} 
                    />
                </div>
                <VaultInput 
                    symbol="UNIT"
                    onChange={onUnitAmountChange} 
                    value={unitValue}
                />
                <div className="h-8"></div>
                {error && <div className="rounded-full bg-red/10 text-red px-8 py-3 mb-4 text-sm">{error}</div>}
                <Button disabled={error.length > 0} onClick={() => {}}>
                    { isManage ? t('update') : t('create')}
                </Button>
            </div>
        </div>
        <div>
            <div className="text-2xl font-bold mb-6">
                {t('info')}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border grid grid-cols-3 gap-y-16">
                <VaultInfoBox
                    title={t('liquidation-price')}
                    value={0}
                    info={t('liquidation-price-info')}
                />
                <VaultInfoBox
                    title={t('vault-unit-debt')}
                    value={0}
                />
                <VaultInfoBox
                    title={t('available-to-generate')}
                    value={0}
                />
                <VaultInfoBox
                    title={t('collateralization-ratio')}
                    value={0}
                    info={t('collateralization-ratio-info')}
                />
                <VaultInfoBox
                    title={t('collateral-locked')}
                    value={0}
                    info={t('collateral-locked-info')}
                />
                <VaultInfoBox
                    title={t('available-to-withdraw')}
                    value={0}
                />
            </div>
        </div>
    </div>
}