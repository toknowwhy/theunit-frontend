'use client';

import { VaultActionType, VaultProp } from "@/app/types";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { useState } from "react";
import Button from "../button/Button";
import ActionTab from "./ActionTab";
import VaultInfoBox from "./VaultInfoBox";
import VaultInput from "./VaultInput";

export default function VaultForm({
    id,
    collateral,
} : VaultProp) {

    const isManage = id != null;
    const symbol = collateral.symbol;

    const t = useVaultTranslations();

    const [collateralAction, setCollateralAction] = useState<VaultActionType>('deposit');
    const [unitAction, setUnitAction] = useState<VaultActionType>('mint');
    const [collateralValue, setCollateralValue] = useState<number | undefined>(0);
    const [unitValue, setUnitValue] = useState<number | undefined>();


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
                    onChange={setCollateralValue} 
                    value={collateralValue} 
                    unitPrice={1280.0}
                />
                <div className="h-8"></div>
                <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px] mb-4">
                    <ActionTab 
                        active={collateralAction == 'mint'} 
                        title={t('mint')} 
                        onClick={() => { setUnitAction('mint') }} 
                    />
                    <ActionTab 
                        active={collateralAction == 'burn'} 
                        title={t('burn')} 
                        onClick={() => { setUnitAction('burn') }} 
                    />
                </div>
                <div className="h-4"></div>
                <VaultInput 
                    symbol="UNIT"
                    onChange={setCollateralValue} 
                    value={unitValue} 
                />
                <div className="h-8"></div>
                <Button onClick={() => {}}>
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