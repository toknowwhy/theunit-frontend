"use client"

import { memo } from "react";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { TokenDesc } from "@/utils/types";
import Button from "../../button/Button";
import ApproveButton from "./ApproveButton";
import ConfirmBtn from "./ManageButton";

export interface VaultButtonProps {
    collateral: TokenDesc;
    collateralAmount: number;
    unitAmount: number;
    account?: string;
    disabled: boolean;
    isManage: boolean;
    reset: () => void;
}

const VaultButton = memo(function VaultButton(props: VaultButtonProps) {
    const t = useVaultTranslations();
    const { collateral, disabled, isManage } = props;
    if (disabled) {
        return <Button disabled>
                    { isManage ? t('update') : t('create')}
                </Button>
    }

    return collateral.stable ? 
            <ApproveButton { ...props } /> : 
            <ConfirmBtn { ...props } />
})

export default VaultButton;