'use client';

import { useContractByType } from "@/crypto/hooks/useContractByType";

export default function ManageVault() {
    const vaultContract = useContractByType("vault");
    return <>{vaultContract?.address ?? 'none'}</>
}