import { toFloat } from "@/utils/functions";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useContractRead, usePublicClient, useWalletClient } from "wagmi";
import { useState } from "react";
import { VaultButtonProps } from "@/utils/types";
import ConfirmBtn from "./ManageButton";
import TxButton from "@/components/web3/TxButton";
import Button from "@/components/form/Button";
import { useContracts } from "../VaultNetworkProvider";
import { formatEther, parseEther } from "viem";
import buildTx from "@/utils/buildTx";
import GasEstimate from "@/components/web3/GasEstimate";

export default function ApproveButton(props : VaultButtonProps) {
    const { unitAmount, account, isManage, unitPrice } = props
    const uamount = Math.abs(unitAmount);
    const [allowanceData, setAllowanceData] = useState<bigint>(BigInt(0));
    const [vaultAllow, setVaultAllow] = useState(isManage);
    const [preparing, setPreparing] = useState(false);
    const [gas, setGas] = useState<number>(0);
    const [txId, setTxId] = useState('');
    const t = useVaultTranslations();
    const network = useContracts();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient()
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

    if (!needToApprove) {
        return <ConfirmBtn { ...props } />
    }
    if (isLoading || isVaultLoading) {
        return <Button loading={true} disabled={true}> </Button>
    }
    if (error || vaultApproveError) {
        return <>
            <Button disabled={true}>{title}</Button>
            <div className="rounded-full bg-error/10 text-error px-8 py-3 mb-4 text-sm mt-4">
                {t('cannot-send-transaction')}
            </div>
        </>
    }

    const approveParams = !vaultAllow ? [contractAddress, true] : 
    [contractAddress, parseEther(uamount.toString())];

    const refetchAllowance = (isUnit = true) => {
        if (isUnit) {
            refetch();
        } else {
            vaultAllowanceRefetch();
        }
    }

    const approve = async () => {

        setPreparing(true)
        const callTransaction = await buildTx({
            publicClient,
            walletClient,
            account,
            contract: toPrepareContract,
            args: approveParams,
            value: undefined,
            functionName: 'approve',
            errMsg: t('cannot-send-transaction'),
        })
        setPreparing(false)
        if (callTransaction) {
            setGas(gas)
            let tid = '';
            if (needToApprove) {
                tid = await sendTx({
                    name: title,
                    callTransaction,
                    callbacks: {
                        refetch: () => {
                            refetchAllowance(vaultAllow)
                        }
                    }
                })
            }
            setTxId(tid)
        }
    }

    return <>
        <TxButton 
            txId={txId}  
            onClick={approve} 
            loading={isRefetching || vaultAllowanceIsRefetching || isLoading || isVaultLoading || preparing}
        >
            {title}
        </TxButton>
        {account && <GasEstimate 
            publicClient={publicClient}
            account={account}
            contract={network!.RouterV1}
            args={approveParams}
            functionName='approve'
            unitPrice={unitPrice}
        />}
    </>
}