"use client"

import { TokenDesc } from "@/crypto/types";
import { useContractRead } from "wagmi";

export interface VaultButtonProps {
    collateral: TokenDesc;
    collateralAmount: number;
    unitAmount: number;
}

export default function VaultButton(props: VaultButtonProps) {
    if (props.collateral.stable) {
        return <ApproveButton { ...props } />
    }
    return <ConfirmBtn { ...props } />
}

function ApproveButton({ collateral } : VaultButtonProps) {
    const { data, error, isLoading, refetch } = useContractRead({
        address: collateral.address,
        abi: collateral.abi,
        functionName: 'allowance',
    })
    if (isLoading) {
        return <>loading...</>
    }
    if (error) {
        return <>error</>
    }

    return <>{JSON.stringify(data)}</>
}

function ConfirmBtn({ collateral } : VaultButtonProps) {
    return <></>
}