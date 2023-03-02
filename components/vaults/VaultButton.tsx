"use client"

import { toFloat } from "@/app/utils";
import { useCurrentNetwork } from "@/crypto/hooks/useCurrentNetwork";
import { useTx } from "@/crypto/hooks/useTx";
import { useVaultTranslations } from "@/crypto/hooks/useVaultTranslations";
import { TokenDesc } from "@/crypto/types";
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useContractRead, useSigner } from "wagmi";
import Button from "../button/Button";
import 'react-toastify/dist/ReactToastify.min.css';
import { memo, useState } from "react";
import { buildTx } from "@/crypto/utils/buildTx";
import ClipLoader from "react-spinners/ClipLoader";

export interface VaultButtonProps {
    collateral: TokenDesc;
    collateralAmount: number;
    unitAmount: number;
    account?: string;
    disabled: boolean;
    isManage: boolean;
}

const VaultButton = memo(function VaultButton(props: VaultButtonProps) {
    const t = useVaultTranslations();
    const { collateral, disabled, isManage } = props;
    if (disabled) {
        return <Button disabled={disabled} onClick={() => {}}>
                    { isManage ? t('update') : t('create')}
                </Button>
    }

    return collateral.stable ? 
            <ApproveButton { ...props } /> : 
            <ConfirmBtn { ...props } />
})

function ApproveButton(props : VaultButtonProps) {
    const { collateral, account, collateralAmount } = props
    const [loading, setLoading] = useState(false);
    const [allowanceData, setAllowanceData] = useState<BigNumber>(BigNumber.from(0));
    const t = useVaultTranslations();
    const network = useCurrentNetwork();
    const { refetch: getSigner } = useSigner();
    const sendTx = useTx();
    const contractAddress = network.unitRouter.address;
    const { error, data: adata, refetch, isRefetching } = useContractRead({
        address: collateral.address,
        abi: collateral.abi,
        functionName: 'allowance',
        args: [account, contractAddress],
        onSuccess(data) {
            setAllowanceData(data as BigNumber)
        },
    })
    const allowance = formatUnits(allowanceData as BigNumber, collateral.decimals);
    const needToApprove = toFloat(allowance) < collateralAmount;
    if (error) {
        return <div>{error.message}</div>
    }
    if (!adata) {
        return <ClipLoader />
    }
    if (!needToApprove) {
        return <ConfirmBtn { ...props } />
    }

    const refetchAllowance = () => {
        refetch();
    }

    const approve = async () => {
        const { data: signer } = await getSigner()
        const callTransaction = buildTx(
            collateral, 
            "approve", 
            signer!, 
            [contractAddress, parseUnits(collateralAmount.toString(), collateral.decimals)]
        )
        setLoading(true);
        await sendTx({
            name: `${t('approve')} ${collateral.symbol}`,
            callTransaction,
            callbacks: {
              refetch: refetchAllowance
            }
        })
        setLoading(false);
    }


    return <Button 
                onClick={approve} 
                loading={loading || isRefetching}
            >
                {loading ? t('approving') : t('approve')} {collateral.symbol}
            </Button>
}

function ConfirmBtn({ collateral } : VaultButtonProps) {
    const t = useVaultTranslations();
    return <Button onClick={() => {}}>
        {t('confirm')}
    </Button>
}

export default VaultButton;