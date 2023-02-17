'use client';

import { VAULT_COLLATERAL_ACTIONS, VAULT_UNIT_ACTIONS } from "@/helpers/constants";
import { VaultActionType } from "@/helpers/types";
import { useState } from "react";
import Button from "../button/Button";
import ActionTab from "./ActionTab";
import VaultInput from "./VaultInput";

export default function VaultForm({
    symbol,
    isManage = false,
    translations
} : {
    symbol: string,
    isManage?: boolean,
    translations: Record<string, string>
}) {
    const [collateralAction, setCollateralAction] = useState<VaultActionType>(VAULT_COLLATERAL_ACTIONS[0]);
    const [unitAction, setUnitAction] = useState<VaultActionType>(VAULT_UNIT_ACTIONS[0]);
    const [collateralValue, setCollateralValue] = useState<number | undefined>(0);
    const [unitValue, setUnitValue] = useState<number | undefined>();

    return <div>
        <div className="text-2xl font-bold mb-6">
            { isManage ? translations['manage'] : translations['create']}
        </div>
        <ActionWrapper 
            actions={VAULT_COLLATERAL_ACTIONS}
            selectedAction={collateralAction}
            translations={translations}
            onClick={setCollateralAction}
        />
        <div className="h-4"></div>
        <VaultInput 
            symbol={symbol} 
            onChange={setCollateralValue} 
            value={collateralValue} 
            unitPrice={1280.0}
        />
        <div className="h-8"></div>
        <ActionWrapper 
            actions={VAULT_UNIT_ACTIONS}
            selectedAction={unitAction}
            translations={translations}
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
            { isManage ? translations['update'] : translations['create']}
        </Button>
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
    return <div className="bg-gray-dark rounded-md p-1">
        {actions.map((action) => <ActionTab 
                                    key={action}
                                    active={selectedAction == action} 
                                    title={translations[action]} 
                                    onClick={() => { onClick(action) }} 
                                />
        )}
    </div>
}