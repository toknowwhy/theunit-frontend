'use client'

import { useEffect, useState } from "react"
import { usePublicClient, useWalletClient } from "wagmi";
import { useContracts } from "../vaults/VaultNetworkProvider";
import { supportedNetworks } from "@/crypto/config";
import TicketInfo from "./TicketInfo";

export default function ClaimInfo() {

    const [mounted, setMounted] = useState(false);
    const contracts = useContracts();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient()
    const tickets = contracts?.id ? supportedNetworks[contracts.id].tickets : [];

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        { tickets.map((ticket) => (<>
            <TicketInfo 
                address={ticket} 
                key={ticket} 
                walletClient={walletClient}
                publicClient={publicClient}
                ticketFactory={contracts?.TicketFactory}
            />
        </>))}
    </div>
}