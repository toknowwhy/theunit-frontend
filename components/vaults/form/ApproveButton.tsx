"use client"

import { toFloat } from "@/utils/functions";
import { useCurrentNetwork } from "@/utils/hooks/useCurrentNetwork";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { BigNumber } from "ethers";
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useContractRead, useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import { VaultButtonProps } from "./VaultButton";
import ConfirmBtn from "./ManageButton";
import TxButton from "@/components/web3/TxButton";
import Button from "@/components/button/Button";

export default function ApproveButton(props : VaultButtonProps) {
    const { unitAmount, account, collateralAmount } = props
    const uamount = Math.abs(unitAmount);
    const camount = Math.abs(collateralAmount);
    const [allowanceData, setAllowanceData] = useState<BigNumber>(BigNumber.from(0));
    const [txId, setTxId] = useState('');
    const t = useVaultTranslations();
    const network = useCurrentNetwork();
    const { refetch: getSigner } = useSigner();
    const sendTx = useTx();
    const contractAddress = network.unitRouter.address;
    const unitToken = network.unitToken;
    const vault = network.vault;
    const { error, data: adata, isLoading, refetch, isRefetching } = useContractRead({
        address: unitToken.address,
        abi: unitToken.abi,
        functionName: 'allowance',
        enabled: unitAmount < 0,
        args: [account, contractAddress],
        onSuccess(data) {
            setAllowanceData(data as BigNumber)
        },
    })
    const { 
        error: vaultApproveError, 
        data: vaultAllowanceData, 
        refetch: vaultAllowanceRefetch, 
        isLoading: isVaultLoading,
        isRefetching: vaultAllowanceIsRefetching, 
    } = useContractRead({
        address: vault.address,
        abi: vault.abi,
        functionName: 'allowances',
        enabled: collateralAmount < 0,
        args: [account, network.ETHAddress],
        onSuccess(data) {
            setAllowanceData(data as BigNumber)
        },
    })
    const allowance = formatUnits(allowanceData as BigNumber, unitToken.decimals);
    const needToApprove = toFloat(allowance) < uamount;
    const vaultAllowance = formatEther(vaultAllowanceData as BigNumber);
    const needVaultApprove = toFloat(vaultAllowance) < camount;
    if (error || vaultApproveError) {
        return <div>{(error ?? vaultApproveError)!.message}</div>
    }
    if (isLoading || isVaultLoading) {
        return <Button loading={true} disabled={true}> </Button>
    }
    if (!needToApprove && !needVaultApprove) {
        return <ConfirmBtn { ...props } />
    }

    const refetchAllowance = (isUnit = true) => {
        if (isUnit) {
            refetch();
        } else {
            vaultAllowanceRefetch();
        }
    }

    const title = needToApprove ? t('approve-unit') : t('approve-vault');
    const approve = async () => {
        const { data: signer } = await getSigner()
        let tid = '';
        if (needToApprove) {
            const callTransaction = buildTx(
                unitToken, 
                "approve", 
                signer!, 
                [contractAddress, parseUnits(Number.MAX_SAFE_INTEGER.toString(), unitToken.decimals)]
            )
            tid = await sendTx({
                name: title,
                callTransaction,
                callbacks: {
                  refetch: () => {
                    refetchAllowance(true)
                  }
                }
            })
        }
        if (needVaultApprove) {
            const callTransaction = buildTx(
                vault, 
                "approve", 
                signer!, 
                [network.ETHAddress, true]
            )
            const txId = await sendTx({
                name: t('approve-vault'),
                callTransaction,
                callbacks: {
                  refetch: () => {
                    refetchAllowance(false)
                  }
                }
            })
            if (!tid) {
                tid = txId
            }
        }
        setTxId(tid)
    }

    return <TxButton txId={txId}  onClick={approve} loading={isRefetching || vaultAllowanceIsRefetching}>
                {title}
           </TxButton>
}