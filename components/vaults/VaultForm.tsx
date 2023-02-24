'use client';

import { VAULT_COLLATERAL_ACTIONS, VAULT_UNIT_ACTIONS } from "@/app/constants";
import { VaultActionType, VaultProp } from "@/app/types";
import { useTranslations } from "next-intl";
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

    const t = useTranslations('Vault');

    const [collateralAction, setCollateralAction] = useState<VaultActionType>(VAULT_COLLATERAL_ACTIONS[0]);
    const [unitAction, setUnitAction] = useState<VaultActionType>(VAULT_UNIT_ACTIONS[0]);
    const [collateralValue, setCollateralValue] = useState<number | undefined>(0);
    const [unitValue, setUnitValue] = useState<number | undefined>();

    return <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-8 mt-10">
        <div>
            <div className="text-2xl font-bold mb-6">
                { isManage ? t['manage'] : t['create']}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border">
                <ActionWrapper 
                    actions={VAULT_COLLATERAL_ACTIONS}
                    selectedAction={collateralAction}
                    translations={t}
                    onClick={setCollateralAction}
                />
                <div className="h-4"></div>
                <VaultInput 
                    symbol={collateral.symbol} 
                    onChange={setCollateralValue} 
                    value={collateralValue} 
                    unitPrice={1280.0}
                />
                <div className="h-8"></div>
                <ActionWrapper 
                    actions={VAULT_UNIT_ACTIONS}
                    selectedAction={unitAction}
                    translations={t}
                    onClick={setUnitAction}
                />
                <div className="h-4"></div>
                <VaultInput 
                    symbol="UNIT"
                    onChange={setCollateralValue} 
                    value={unitValue} 
                />
                <div className="h-8"></div>
                <Button onClick={() => {}}>
                    { isManage ? t['update'] : t['create']}
                </Button>
            </div>
        </div>
        <div>
            <div className="text-2xl font-bold mb-6">
                {t['info']}
            </div>
            <div className="py-10 px-8 bg-gray-darker rounded-lg border-r-8 border-r-gray-border border-b-8 border-b-gray-border grid grid-cols-3 gap-y-16">
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
                <VaultInfoBox
                    title="Liquidation Price"
                    value={0}
                    info="The Liquidation Price is the price at which a Vault becomes vulnerable to liquidation."
                />
            </div>
        </div>
    </div>
}

function ActionWrapper({
    actions,
    selectedAction,
    translations,
    onClick
} : {
    actions: VaultActionType[],
    selectedAction: VaultActionType,
    translations: Record<string, string>,
    onClick: (action: VaultActionType) => void;
}) {
    return <div className="bg-gray-dark rounded-md p-1 inline-block min-w-[261px]">
        {actions.map((action) => <ActionTab 
                                    key={action}
                                    active={selectedAction == action} 
                                    title={translations[action]} 
                                    onClick={() => { onClick(action) }} 
                                />
        )}
    </div>
}