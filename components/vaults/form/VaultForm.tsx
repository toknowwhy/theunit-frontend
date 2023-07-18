'use client';

import { RECOMMENDED_COLLATERAL_RATIO } from "@/utils/constants";
import { ContractDesc, TokenDesc, VaultActionType, VaultInfoType } from "@/utils/types";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useEffect, useState } from "react";
import ActionTab from "./ActionTab";
import FormInput from "../../FormInput";
import { getBalanceFromBigNumber, getRatioFromLiquidationFee, toFloat } from "@/utils/functions";
import useDebounce from "@/utils/hooks/useDebounce";
import { formatEther, formatUnits } from "ethers/lib/utils.js";
import VaultStats from "../info/VaultStats";
import TokenBalance from "./TokenBalance";
import VaultButton from "./VaultButton";
import { useBalance } from "wagmi";
import BoxContainer from "@/components/BoxContainer";
import { useTinuBalance } from "@/utils/hooks/useTinuBalance";

export default function VaultForm({
    collateral,
    vaultInfo,
    account,
    refetchVaultInfo,
} : {
    collateral: TokenDesc,
    vaultInfo: VaultInfoType,
    account?: `0x${string}`,
    refetchVaultInfo: () => void,
}) {

    const {
        currentPrice: price,
        liquidationFee,
        minUnit,
        collateralAmount: vaultCollateralAmount,
        unitAmount: vaultUnitDebt,
    } = vaultInfo;

    const camount = vaultCollateralAmount ? parseFloat(formatUnits(vaultCollateralAmount, collateral.decimals)) : 0;
    const uamount = vaultUnitDebt ? parseFloat(formatEther(vaultUnitDebt)) : 0;
    const isManage = camount > 0;
    const symbol = collateral.symbol;
    const isETH = symbol === 'ETH';
    
    const t = useVaultTranslations();

    const [collateralAction, setCollateralAction] = useState<VaultActionType>('deposit');
    const [unitAction, setUnitAction] = useState<VaultActionType>('mint');
    const [collateralValue, setCollateralValue] = useState<string>('');
    const [unitValue, setUnitValue] = useState<string>('');
    const [balance, setBalance] = useState(0);
    const [unitBalance, setUnitBalance] = useState(0);

    const debounceUnitValue = useDebounce(unitValue, 500);
    const debounceCollateralValue = useDebounce(collateralValue, 500);
    const { balance: ubal, refetch: refetchUbal } = useTinuBalance(account);
    const { data: ebal, refetch: refetchEbal } = useBalance({
        address: account,
        enabled: Boolean(account) && isETH
    })

    useEffect(() => {
        if (ebal !== undefined) {
            setBalance(parseFloat(ebal.formatted));
        }
        if (ubal !== undefined) {
            setUnitBalance(getBalanceFromBigNumber(ubal));
        }
    }, [ubal, ebal])

    
    const uvalue = toFloat(debounceUnitValue);
    const cvalue = toFloat(debounceCollateralValue);
    const finalUnitValue = unitAction === 'mint' ? uvalue : -uvalue;
    const finalCollateralValue = collateralAction === 'deposit' ? cvalue : -cvalue;
    const unitValueAfter = finalUnitValue + uamount;
    const collateralValueAfter = finalCollateralValue + camount;
    const ratio = collateralValueAfter == 0 ? 0 : (collateralValueAfter * price / unitValueAfter);
    const liquidationRatio = getRatioFromLiquidationFee(liquidationFee);

    const isClosing = unitValueAfter == 0 && collateralValueAfter == 0 && isManage;

    let error = '';
    if ((uvalue == 0 && cvalue == 0) || isClosing) {
        error = '';
    } else if (uvalue < 0 || cvalue < 0) {
        error = t('less-than-0');
    } else if (unitValueAfter < minUnit && unitValueAfter > 0) {
        if (unitAction === 'burn') {
            error = t('not-enough-unit-burn', {num: minUnit});
        } else {
            error = t('not-enough-unit', {num: minUnit});
        }
    } else if (unitAction === 'burn' && uvalue > (unitBalance ?? 0)) {
        error = t('not-enough-unit-to-burn')
    } else if (ratio < liquidationRatio) {
        error = t('lower-than-ratio');
    } else if ((!balance || cvalue > balance) && collateralAction === 'deposit') {
        error = t('not-enough-balance')
    }

    const onUnitAmountChange = (value: string) => {
        setUnitValue(value);
    }

    const onCollateralAmountChange = (value: string) => {
        setCollateralValue(value);
        if (collateralAction === 'deposit' && unitAction === 'mint') {
            const uv = (price * toFloat(value) / (liquidationRatio+RECOMMENDED_COLLATERAL_RATIO)).toString();
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
        refetchEbal();
        refetchUbal();
        refetchVaultInfo();
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

    const onMax = () => {
        setCollateralValue(balance.toString())
    }

    const onMaxUnit = () => {
        setUnitValue(unitBalance.toString())
        setCollateralValue(camount.toString())
    }

    return <div className="pb-20 xl:grid xl:grid-cols-[2fr_3fr] xl:gap-8 mt-10">
        <div className="mb-10">
            <div className="text-2xl font-bold mb-6">
                { isManage ? t('manage') : t('create')}
            </div>
            <BoxContainer>
                <div className="py-10 px-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-transparent border border-gray-border rounded-md p-1 inline-block min-w-[250px]">
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
                    
                    <FormInput 
                        symbol={collateral.symbol} 
                        onChange={onCollateralAmountChange} 
                        value={collateralValue} 
                        unitPrice={price}
                        onMax={collateralAction === 'deposit' ? onMax : onMaxUnit}
                    />
                    <div className="flex justify-between items-center mb-4 mt-8">
                    <div className="bg-transparent border border-gray-border rounded-md p-1 inline-block min-w-[250px]">
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
                    <FormInput 
                        symbol="TINU"
                        onChange={onUnitAmountChange} 
                        value={unitValue}
                        onMax={unitAction === 'burn' ? onMaxUnit : undefined}
                    />
                    <div className="h-8"></div>
                    {error && <div className="rounded-full bg-error/10 text-error px-8 py-3 mb-4 text-sm">{error}</div>}
                    <VaultButton
                        collateral={collateral}
                        collateralAmount={finalCollateralValue}
                        unitAmount={finalUnitValue}
                        disabled={error.length > 0 || (uvalue == 0 && cvalue == 0)}
                        isManage={isManage}
                        account={account}
                        gasPrice={vaultInfo.gasPrice * vaultInfo.currentPrice}
                        reset={resetForm}
                        unitBalance={ubal}
                        collateralBalance={vaultCollateralAmount}
                        isClosing={isClosing}
                    />
                </div>
            </BoxContainer>
        </div>
        <div className={error ? 'group has-error' : ''}>
            <div className="text-2xl font-bold mb-6">
                {t('info')}
            </div>
            <VaultStats { ...statsProp } />
        </div>
    </div>
}