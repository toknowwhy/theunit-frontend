"use client"

import { memo, useEffect, useState } from "react";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { TokenDesc } from "@/utils/types";
import Button from "../../button/Button";
import ApproveButton from "./ApproveButton";
import ConfirmBtn from "./ManageButton";
import ConnectWallet from "@/components/web3/ConnectWallet";
import { useIsCorrectNetwork } from "@/utils/hooks/useIsCorrectNetwok";

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
    const { collateral, disabled, isManage, account } = props;
    const isCorrectNetwork = useIsCorrectNetwork()

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        setIsConnected(Boolean(account) && isCorrectNetwork)
    }, [account, isCorrectNetwork])

    if (!isConnected) {
        return <Button>
            <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} notHeader />
        </Button>
    }

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