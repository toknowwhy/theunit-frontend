'use client'

import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import { useContracts } from "../vaults/VaultNetworkProvider";

export default function ClaimInfo() {

    const [mounted, setMounted] = useState(false);
    const { address } = useAccount();
    const contracts = useContracts();
    

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    console.log('AAAA', contracts);

    return (
        <div>{address}</div>
    )
}