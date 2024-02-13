import { Address, PublicClient, WalletClient } from "viem";
import { TicketABI } from "@/crypto/TicketABI";
import { Abi, formatEther } from "viem";
import { ContractDesc } from "@/utils/types";
import BoxContainer from "../BoxContainer";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useState } from "react";
import { useTx } from "@/utils/hooks/useTx";
import buildTx from "@/utils/buildTx";
import TxButton from "../web3/TxButton";
import ApproveBtn from "../web3/ApproveBtn";
import { useReadContract } from "wagmi";

export default function TicketInfo({
    address,
    ticketFactory,
    walletClient,
    publicClient,
} : {
    address: Address,
    ticketFactory?: ContractDesc,
    walletClient?: WalletClient | null,
    publicClient?: PublicClient,
}) {

    const t = useVaultTranslations();
    const [txId, setTxId] = useState('');
    const account = walletClient?.account?.address;
    const [showError, setShowError] = useState('');
    const [claimLoading, setClaimLoading] = useState(false);
    const sendTx = useTx();

    const { data: ticketBalance, refetch } = useReadContract({
        abi: TicketABI as Abi,
        address,
        functionName: 'balanceOf',
        args: [account],
        query: {
            enabled: Boolean(account)
        }
    })

    const { data: unlockTime } = useReadContract({
        ...ticketFactory,
        functionName: 'tickets',
        args: [address!],
        query: {
            enabled: Boolean(ticketBalance) && (ticketBalance as bigint) > 0 
        }
    })

    const unlockMilliseconds = Number(unlockTime ?? 0)*1000;
    const now = new Date();
    const canClaim = Boolean(unlockTime) && now.getTime() > unlockMilliseconds;

    if (!unlockTime || !ticketBalance) {
        return null;
    }

    const tbal = formatEther(ticketBalance as bigint);
    const unlockDate = new Date(unlockMilliseconds);
    const unlockTimeStr = unlockDate.toLocaleDateString();

    const claim = async () => {
        if (!canClaim) {
            setShowError(t('cannot-claim-yet'));
            return;
        }

        if (!publicClient || !walletClient || !ticketFactory) {
            setShowError(t('check-connection'));
            return;
        }

        setClaimLoading(true);

        

        const callTransaction = await buildTx({
            publicClient,
            walletClient,
            account,
            contract: ticketFactory,
            args: [address, ticketBalance, account],
            value: 0,
            functionName: 'unlock',
            errMsg: t('cannot-send-transaction'),
        })
        if (callTransaction) {
            const tid = await sendTx({
                name: t('token-claim'),
                callTransaction,
                callbacks: {
                    refetch: () => {
                        refetch()
                    }
                }
            })
            setTxId(tid)
        }
        setClaimLoading(false);
    }

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="text-2xl font-semibold">UN Ticket</div>
                <div className="h-[1px] w-full bg-gray-border my-6" />
                <div className="flex justify-between items-center">
                    <TicketInfoCol title="Unlock Time" info={unlockTimeStr} />
                    <div className="w-[1px] h-12 bg-gray-border" />
                    <TicketInfoCol title="Ticket Balance" info={tbal} />
                </div>
                <div className="h-[1px] w-full bg-gray-border my-6" />
                <ApproveBtn
                    walletClient={walletClient}
                    publicClient={publicClient}
                    spender={ticketFactory?.address}
                    tokenAddress={address}
                    amount={ticketBalance as bigint}
                    enabled={canClaim}
                >
                    <TxButton
                        txId={txId}
                        loading={claimLoading}
                        onClick={claim}
                    >
                        { t('claim')}
                    </TxButton>
                </ApproveBtn>
                {showError && <div className="text-green text-center mt-2">
                    {showError}
                </div>}
            </div>
        </BoxContainer>
    )

}

function TicketInfoCol({
    title,
    info,
} : {
    title: string,
    info: string,
}) {
    return (
        <div>
            <div className="text-gray">
                {title}
            </div>
            <div className="text-white font-bold text-3xl">
                {info}
            </div>
        </div>
    )
}