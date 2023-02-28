"use client"

import { toFloat } from "@/app/utils";
import { useCurrentNetwork } from "@/crypto/hooks/useCurrentNetwork";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { TokenDesc } from "@/crypto/types";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";
import { useContractRead } from "wagmi";
import Button from "../button/Button";

export interface VaultButtonProps {
    collateral: TokenDesc;
    collateralAmount: number;
    unitAmount: number;
    account?: string;
    disabled: boolean;
    isManage: boolean;
}

export default function VaultButton(props: VaultButtonProps) {
    const t = useVaultTranslations();
    const { collateral, disabled, isManage } = props;
    if (disabled) {
        return <Button disabled={disabled} onClick={() => {}}>
                    { isManage ? t('update') : t('create')}
                </Button>
    }


    if (collateral.stable) {
        return <ApproveButton { ...props } />
    }
    return <ConfirmBtn { ...props } />
}

function ApproveButton(props : VaultButtonProps) {
    const t = useVaultTranslations();
    const { collateral, account, collateralAmount } = props
    const network = useCurrentNetwork();
    const { data, error, isLoading, refetch } = useContractRead({
        address: collateral.address,
        abi: collateral.abi,
        functionName: 'allowance',
        args: [account, network.unitRouter.address]
    })
    if (isLoading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error</div>
    }
    const allowance = formatUnits(data as BigNumber, collateral.decimals);
    if (toFloat(allowance) >= collateralAmount) {
        return <ConfirmBtn { ...props } />
    }

    return <Button onClick={() => {}}>
                {t('approve')} {collateral.symbol}
            </Button>
}

function ConfirmBtn({ collateral } : VaultButtonProps) {
    return <></>
}