'use client';

import { minUnitToMint } from "@/app/constants";
import { VaultActionType, VaultProp } from "@/app/types";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { useState } from "react";
import ActionTab from "./ActionTab";
import VaultInfoBox from "./VaultInfoBox";
import VaultInput from "./VaultInput";
import GasEstimate from "../web3/GasEstimate";
import { useCollateralBalance } from "@/crypto/hooks/useCollateralBalance";
import { toFloat } from "@/app/utils";
import VaultButton from "./VaultButton";
import useDebounce from "@/crypto/hooks/useDebounce";

export default function VaultForm({
    id,
    collateral,
    price,
    liquidationRatio,
} : VaultProp) {

    const isManage = id != null;
    const symbol = collateral.symbol;

    const t = useVaultTranslations();

    const [collateralAction, setCollateralAction] = useState<VaultActionType>('deposit');
    const [unitAction, setUnitAction] = useState<VaultActionType>('mint');
    const [collateralValue, setCollateralValue] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');
    const [error, setError] = useState('');
    const debounceUnitValue = useDebounce(unitValue, 500);
    const debounceCollateralValue = useDebounce(collateralValue, 500);

    const { account, balance } = useCollateralBalance(collateral);
    
    const uvalue = toFloat(debounceUnitValue);
    const cvalue = toFloat(debounceCollateralValue);
    const ratio = cvalue == 0 ? 0 : (uvalue / (cvalue * price));

    const checkError = (uv: string, cv: string) => {
        const uval = toFloat(uv);
        const cval = toFloat(cv);
        if (uval < minUnitToMint) {
            return t('not-enough-unit', {num: minUnitToMint});
        } else if (toFloat(ratio.toFixed(2)) < liquidationRatio) {
            return t('lower-than-ratio');
        } else if (cval > balance) {
            return t('not-enough-balance')
        }
        return '';
    }

    const onUnitAmountChange = (value: string) => {
        setUnitValue(value);
        setError(checkError(value, collateralValue));
    }

    const onCollateralAmountChange = (value: string) => {
        setCollateralValue(value);
        const uv = (price * toFloat(value) * liquidationRatio).toString();
        setUnitValue(uv);
        setError(checkError(uv, value));
    }

    const createVault = async () => {
        const error = checkError(unitValue, collateralValue);
        if (error) {
            setError(error);
            return;
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
                <VaultButton
                    collateral={collateral}
                    collateralAmount={collateralAction === 'deposit' ? cvalue : -cvalue}
                    unitAmount={unitAction === 'mint' ? uvalue : -uvalue}
                    disabled={error.length > 0 || uvalue == 0 || cvalue == 0}
                    isManage={isManage}
                    account={account}
                />
            </div>
        </div>
        <div>
            <div className="text-2xl font-bold mb-6">
                {t('info')}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border grid grid-cols-3 gap-y-16">
                <VaultInfoBox
                    title="liquidation-price"
                    value={0}
                    info="liquidation-price-info"
                    extraValue={uvalue / cvalue / liquidationRatio}
                />
                <VaultInfoBox
                    title="vault-unit-debt"
                    value={0}
                    extraValue={uvalue}
                />
                <VaultInfoBox
                    title="available-to-generate"
                    value={0}
                    extraValue={cvalue * price * liquidationRatio - uvalue}
                />
                <VaultInfoBox
                    title="collateralization-ratio"
                    value={0}
                    info="collateralization-ratio-info"
                    extraValue={ratio}
                    unit="%"
                />
                <VaultInfoBox
                    title="collateral-locked"
                    value={0}
                    info="collateral-locked-info"
                    extraValue={cvalue}
                    unit={symbol}
                />
                <VaultInfoBox
                    title="available-to-withdraw"
                    value={0}
                    extraValue={Math.max(0, (cvalue - uvalue / price / liquidationRatio))}
                    unit={symbol}
                />
            </div>
        </div>
    </div>
}