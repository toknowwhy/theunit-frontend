'use client'

import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import { useContracts } from "../vaults/VaultNetworkProvider";
import { supportedNetworks } from "@/crypto/config";
import TicketInfo from "./TicketInfo";
import Button from "../form/Button";

export default function ClaimInfo() {

    const [mounted, setMounted] = useState(false);
    const [showError, setShowError] = useState(false);
    const { address } = useAccount();
    const contracts = useContracts();
    const tickets = contracts?.id ? supportedNetworks[contracts.id].tickets : [];

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return <>
        { tickets.map((ticket) => (
            <TicketInfo 
                address={ticket} 
                key={ticket} 
                account={address}
                ticketFactory={contracts?.TicketFactory}
            />
        ))}
        {showError && <div className="text-green">
        Cannot claim yet!
        </div>}
        <div className="inline-block w-72">
            <Button 
                onClick={() => {
                    setShowError(true)
                }}
            >
                Claim
            </Button>
        </div>
    </>
}