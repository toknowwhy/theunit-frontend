import { toFloat } from "@/utils/functions";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";
import { VaultButtonProps, WriteResponse } from "@/utils/types";
import ConfirmBtn from "./ManageButton";
import TxButton from "@/components/web3/TxButton";
import Button from "@/components/form/Button";
import { useVaultContracts } from "../VaultNetworkProvider";
import { formatEther, parseEther } from "viem";
import { toast } from "react-toastify";

export default function ApproveButton(props : VaultButtonProps) {
    const { unitAmount, account, isManage } = props
    const uamount = Math.abs(unitAmount);
    const [allowanceData, setAllowanceData] = useState<bigint>(BigInt(0));
    const [vaultAllow, setVaultAllow] = useState(isManage);
    const [txId, setTxId] = useState('');
    const t = useVaultTranslations();
    const network = useVaultContracts();
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
            setAllowanceData(data as bigint)
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
    const allowance = formatEther(allowanceData);
    const tinuNeedApproval = toFloat(allowance) < uamount && unitAmount < 0;
    const toPrepareContract = tinuNeedApproval ? unitToken : vault;
    const title = tinuNeedApproval ? t('approve-unit') : t('approve-vault');
    const needToApprove = !vaultAllow || tinuNeedApproval;
    
    const { config, error: prepareError } = usePrepareContractWrite({
        ...toPrepareContract,
        functionName: 'approve',
        enabled: needToApprove,
        args: !vaultAllow ? [contractAddress, true] : 
            [contractAddress, parseEther(uamount.toString())]
    })
    const { writeAsync } = useContractWrite(config)    

    if (!needToApprove) {
        return <ConfirmBtn { ...props } />
    }
    if (isLoading || isVaultLoading) {
        return <Button loading={true} disabled={true}> </Button>
    }
    if (error || vaultApproveError || prepareError) {
        return <>
            <Button disabled={true}>{title}</Button>
            <div className="rounded-full bg-error/10 text-error px-8 py-3 mb-4 text-sm mt-4">
                {t('cannot-send-transaction')}
            </div>
        </>
    }

    const refetchAllowance = (isUnit = true) => {
        if (isUnit) {
            refetch();
        } else {
            vaultAllowanceRefetch();
        }
    }

    const approve = async () => {
        if (!writeAsync) {
            toast.error(t('cannot-send-transaction'))
        }
        let tid = '';
        if (needToApprove) {
            const txId = await sendTx({
                name: title,
                callTransaction: writeAsync as WriteResponse,
                callbacks: {
                  refetch: () => {
                    refetchAllowance(vaultAllow)
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