'use client';

import { MIN_UNIT_TO_MINT, RECOMMENDED_COLLATERAL } from "@/app/constants";
import { VaultActionType, VaultProp } from "@/app/types";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { useState } from "react";
import ActionTab from "./ActionTab";
import VaultInput from "./VaultInput";
import { toFloat } from "@/app/utils";
import VaultButton from "./VaultButton";
import useDebounce from "@/crypto/hooks/useDebounce";
import { formatEther, formatUnits } from "ethers/lib/utils.js";
import VaultStats from "./VaultStats";

export default function VaultForm({
    collateral,
    price,
    liquidationRatio,
    account,
    balance,
    vaultCollateralAmount,
    vaultUnitDebt,
} : VaultProp) {

    const camount = vaultCollateralAmount ? parseFloat(formatUnits(vaultCollateralAmount, collateral.decimals)) : 0;
    const uamount = vaultUnitDebt ? parseFloat(formatEther(vaultUnitDebt)) : 0;
    const isManage = camount > 0;
    const symbol = collateral.symbol;
    
    const t = useVaultTranslations();

    const [collateralAction, setCollateralAction] = useState<VaultActionType>('deposit');
    const [unitAction, setUnitAction] = useState<VaultActionType>('mint');
    const [collateralValue, setCollateralValue] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');
    const debounceUnitValue = useDebounce(unitValue, 500);
    const debounceCollateralValue = useDebounce(collateralValue, 500);

    
    const uvalue = toFloat(debounceUnitValue);
    const cvalue = toFloat(debounceCollateralValue);
    const finalUnitValue = unitAction === 'mint' ? uvalue : -uvalue;
    const finalCollateralValue = collateralAction === 'deposit' ? cvalue : -cvalue;
    const unitValueAfter = finalUnitValue + uamount;
    const collateralValueAfter = finalCollateralValue + camount;
    const ratio = collateralValueAfter == 0 ? 0 : (collateralValueAfter * price / unitValueAfter);

    let error = '';
    if (uvalue == 0 && cvalue == 0) {
        error = '';
    } else if (uvalue < 0 || cvalue < 0) {
        error = t('less-than-0');
    } else if (unitAction === 'mint' && (uvalue < MIN_UNIT_TO_MINT)) {
        error = t('not-enough-unit', {num: MIN_UNIT_TO_MINT});
    } else if (ratio < liquidationRatio) {
        error = t('lower-than-ratio');
    } else if (!balance || cvalue > balance) {
        error = t('not-enough-balance')
    }

    const onUnitAmountChange = (value: string) => {
        setUnitValue(value);
    }

    const onCollateralAmountChange = (value: string) => {
        setCollateralValue(value);
        if (collateralAction === 'deposit') {
            const uv = (price * toFloat(value) / (liquidationRatio+RECOMMENDED_COLLATERAL)).toString();
            setUnitValue(uv);
        }
    }

    const onCollateralActionChange = (action: VaultActionType) => {
        setCollateralAction(action);
        if (action === "withdraw") {
            setUnitAction('burn');
        }
    }

    const statsProp = {
        camount,
        uamount,
        unitValueAfter,
        collateralValueAfter,
        liquidationRatio,
        price,
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
                        onClick={() => { onCollateralActionChange('deposit') }} 
                    />
                    <ActionTab 
                        active={collateralAction == 'withdraw'} 
                        title={t('withdraw', {symbol})} 
                        onClick={() => { onCollateralActionChange('withdraw') }} 
                    />
                </div>
                <VaultInput 
                    symbol={collateral.symbol} 
                    onChange={onCollateralAmountChange} 
                    value={collateralValue} 
                    unitPrice={price}
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
                <VaultButton
                    collateral={collateral}
                    collateralAmount={finalCollateralValue}
                    unitAmount={finalUnitValue}
                    disabled={error.length > 0 || (uvalue == 0 && cvalue == 0)}
                    isManage={isManage}
                    account={account}
                />
            </div>
        </div>
        <div>
            <div className="text-2xl font-bold mb-6">
                {t('info')}
            </div>
            <VaultStats { ...statsProp } />
        </div>
    </div>
}