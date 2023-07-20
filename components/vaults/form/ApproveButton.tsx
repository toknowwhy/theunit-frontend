import { toFloat } from "@/utils/functions";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils.js";
import { useContractRead, useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import { VaultButtonProps } from "@/utils/types";
import ConfirmBtn from "./ManageButton";
import TxButton from "@/components/web3/TxButton";
import Button from "@/components/button/Button";
import { useVaultContracts } from "../VaultNetworkProvider";

export default function ApproveButton(props : VaultButtonProps) {
    const { unitAmount, account, collateralAmount, isManage } = props
    const uamount = Math.abs(unitAmount);
    const camount = Math.abs(collateralAmount);
    const [allowanceData, setAllowanceData] = useState<BigNumber>(BigNumber.from(0));
    const [vaultAllow, setVaultAllow] = useState(isManage);
    const [txId, setTxId] = useState('');
    const t = useVaultTranslations();
    const network = useVaultContracts();
    const { refetch: getSigner } = useSigner();
    const sendTx = useTx();
    const unitToken = network!.TinuToken;
    const contractAddress = network?.RouterV1.address;
    const vault = network!.Vault;
    const { error, isLoading, refetch, isRefetching } = useContractRead({
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
        refetch: vaultAllowanceRefetch, 
        isLoading: isVaultLoading,
        isRefetching: vaultAllowanceIsRefetching, 
    } = useContractRead({
        address: vault.address,
        abi: vault.abi,
        functionName: 'allowances',
        enabled: !isManage,
        args: [account, contractAddress],
        onSuccess(data) {
            setVaultAllow(data as boolean)
        },
    })

    if (error || vaultApproveError) {
        return <div>{(error ?? vaultApproveError)!.message}</div>
    }
    if (isLoading || isVaultLoading) {
        return <Button loading={true} disabled={true}> </Button>
    }

    const allowance = formatEther(allowanceData as BigNumber);
    const needToApprove = toFloat(allowance) < uamount && unitAmount < 0;

    if (!needToApprove && vaultAllow) {
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
        if (!vaultAllow) {
            const callTransaction = buildTx(
                vault, 
                "approve", 
                signer!, 
                [contractAddress, true]
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
        } else if (needToApprove) {
            const callTransaction = buildTx(
                unitToken, 
                "approve", 
                signer!, 
                [contractAddress, parseEther(Number.MAX_SAFE_INTEGER.toString())]
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
        setTxId(tid)
    }

    return <TxButton txId={txId}  onClick={approve} loading={isRefetching || vaultAllowanceIsRefetching}>
                {title}
           </TxButton>
}