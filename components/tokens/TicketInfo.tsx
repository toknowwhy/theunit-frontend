import { Address } from "viem";
import { useContractRead } from "wagmi";
import { TicketABI } from "@/crypto/TicketABI";
import { Abi, formatEther } from "viem";
import { ContractDesc } from "@/utils/types";

export default function TicketInfo({
    address,
    ticketFactory,
    account,
} : {
    address: Address,
    ticketFactory?: ContractDesc,
    account?: Address,
}) {
    const { data: ticketBalance } = useContractRead({
        abi: TicketABI as Abi,
        address,
        functionName: 'balanceOf',
        args: [account],
        enabled: Boolean(account)
    })

    const { data: unlockTime } = useContractRead({
        ...ticketFactory,
        functionName: 'tickets',
        args: [address!],
        enabled: Boolean(ticketBalance) && (ticketBalance as bigint) > 0 
    })

    if (unlockTime) {
        const unlockDate = new Date(Number(unlockTime)*1000);
        return `UN Ticket Balance: ${parseFloat(formatEther(ticketBalance as bigint))} - Unlock Time: ${unlockDate.toLocaleDateString()}`
    }

    return null;
}