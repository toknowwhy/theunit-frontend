'use client'

import { useEffect, useState } from "react"
import { useAccount } from "wagmi";
import ConnectWallet from "../web3/ConnectWallet";

export default function ClaimInfo() {

    const [mounted, setMounted] = useState(false);
    const { address } = useAccount()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    if (!address) {
        return <ConnectWallet connectLabel={""} networkLabel={""} />
    }

    return (
        <div>{address}</div>
    )
}