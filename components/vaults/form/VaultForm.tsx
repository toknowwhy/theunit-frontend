'use client';

import { MIN_UNIT_TO_MINT, RECOMMENDED_COLLATERAL } from "@/utils/constants";
import { VaultActionType, VaultProp } from "@/utils/types";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useCollateralBalance } from '@/utils/hooks/useCollateralBalance';
import { useEffect, useState } from "react";
import ActionTab from "./ActionTab";
import VaultInput from "./VaultInput";
import { toFloat } from "@/utils/functions";
import useDebounce from "@/utils/hooks/useDebounce";
import { formatEther, formatUnits } from "ethers/lib/utils.js";
import VaultStats from "../info/VaultStats";
import TokenBalance from "./TokenBalance";
import VaultButton from "./VaultButton";

export default function VaultForm({
    collateral,
    price,
    liquidationRatio,
    account,
    vaultCollateralAmount,
    vaultUnitDebt,
    unitToken,
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
    const [balance, setBalance] = useState(0);
    const [unitBalance, setUnitBalance] = useState(0);

    const debounceUnitValue = useDebounce(unitValue, 500);
    const debounceCollateralValue = useDebounce(collateralValue, 500);
    const { balance: cbal, refetch: refetchCbal } = useCollateralBalance(collateral, account);
    const { balance: ubal, refetch: refetchUbal } = useCollateralBalance(unitToken, account);

    useEffect(() => {
        if (cbal) {
            setBalance(cbal);
        }
        if (ubal) {
            setUnitBalance(ubal);
        }
    }, [cbal, ubal])

    
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
    } else if (unitAction === 'mint' && uvalue > 0 && uvalue < MIN_UNIT_TO_MINT) {
        error = t('not-enough-unit', {num: MIN_UNIT_TO_MINT});
    } else if (unitAction === 'burn' && uvalue > (unitBalance ?? 0)) {
        error = t('not-enough-unit-to-burn')
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

    const resetForm = () => {
        setUnitValue('');
        setCollateralValue('');
        refetchCbal();
        refetchUbal();
    }

    const statsProp = {
        camount,
        uamount,
        unitValueAfter,
        collateralValueAfter,
        liquidationRatio,
        price,
        error,
    }

    return <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-8 mt-10">
        <div>
            <div className="text-2xl font-bold mb-6">
                { isManage ? t('manage') : t('create')}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border">
                <div className="flex justify-between items-center mb-4">
                    <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px]">
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
                    <TokenBalance balance={balance} />
                </div>
                
                <VaultInput 
                    symbol={collateral.symbol} 
                    onChange={onCollateralAmountChange} 
                    value={collateralValue} 
                    unitPrice={price}
                />
                <div className="flex justify-between items-center mb-4 mt-8">
                    <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px]">
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
                    <TokenBalance balance={unitBalance} />
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
                    reset={resetForm}
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