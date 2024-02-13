import { ReactNode, useState } from "react";
import { Address, PublicClient, WalletClient, erc20Abi } from "viem";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import buildTx from "@/utils/buildTx";
import { useTx } from "@/utils/hooks/useTx";
import { toast } from "react-toastify";
import TxButton from "./TxButton";
import { useReadContract } from "wagmi";

export default function ApproveBtn({
    tokenAddress,
    amount,
    spender,
    enabled = true,
    walletClient,
    publicClient,
    children,
} : {
    tokenAddress: Address,
    amount: bigint,
    spender?: Address,
    enabled?: boolean,
    walletClient?: WalletClient | null,
    publicClient?: PublicClient,
    children: ReactNode,
}) {

    const t = useVaultTranslations();
    const sendTx = useTx();
    const [loading, setLoading] = useState(false)
    const [txId, setTxId] = useState('');
    const owner = walletClient?.account?.address;

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'allowance',
        args: [owner!, spender!],
        query: {
            enabled: Boolean(owner) && Boolean(spender) && enabled
        }
    })

    if ((allowance && (allowance as bigint) >= amount) || !enabled) {
        return children;
    }

    const approve = async () => {

        if (!publicClient || !walletClient || !owner) {
            toast(t('check-connection'));
            return;
        }

        setLoading(true);

        const approveTransaction = await buildTx({
            publicClient,
            walletClient,
            account: owner,
            contract: {
                abi: erc20Abi,
                address: tokenAddress
            },
            args: [spender, amount],
            value: 0,
            functionName: 'approve',
            errMsg: t('cannot-send-transaction'),
        })
        if (approveTransaction) {
            const tid = await sendTx({
                name: t('token-claim'),
                callTransaction: approveTransaction,
                callbacks: {
                    refetch: () => {
                        refetchAllowance()
                    }
                }
            })
            setTxId(tid)
        }
        setLoading(false);
    }

    return (
        <TxButton
            txId={txId}
            loading={loading}
            onClick={approve}
        >
            {t('approve')}
        </TxButton>
    )

}