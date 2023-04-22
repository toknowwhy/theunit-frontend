"use client"

import { toFloat } from "@/utils/functions";
import { useCurrentNetwork } from "@/utils/hooks/useCurrentNetwork";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useContractRead, useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import ClipLoader from "react-spinners/ClipLoader";
import { VaultButtonProps } from "./VaultButton";
import ConfirmBtn from "./ManageButton";
import TxButton from "@/components/web3/TxButton";

export default function ApproveButton(props : VaultButtonProps) {
    const { unitAmount, account } = props
    const uamount = Math.abs(unitAmount);
    const [allowanceData, setAllowanceData] = useState<BigNumber>(BigNumber.from(0));
    const [txId, setTxId] = useState('');
    const t = useVaultTranslations();
    const network = useCurrentNetwork();
    const { refetch: getSigner } = useSigner();
    const sendTx = useTx();
    const contractAddress = network.unitRouter.address;
    const unitToken = network.unitToken;
    const { error, data: adata, refetch, isRefetching } = useContractRead({
        address: unitToken.address,
        abi: unitToken.abi,
        functionName: 'allowance',
        args: [account, contractAddress],
        onSuccess(data) {
            setAllowanceData(data as BigNumber)
        },
    })
    const allowance = formatUnits(allowanceData as BigNumber, unitToken.decimals);
    const needToApprove = toFloat(allowance) < uamount;
    if (error) {
        return <div>{error.message}</div>
    }
    if (!adata) {
        return <ClipLoader color="#cccccc" />
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
            unitToken, 
            "approve", 
            signer!, 
            [contractAddress, parseUnits(Number.MAX_SAFE_INTEGER.toString(), unitToken.decimals)]
        )
        const txId = await sendTx({
            name: `${t('approve')} UNIT`,
            callTransaction,
            callbacks: {
              refetch: refetchAllowance
            }
        })
        setTxId(txId);
    }


    return <TxButton txId={txId}  onClick={approve} loading={isRefetching}>
                {t('approve')} UNIT
           </TxButton>
}