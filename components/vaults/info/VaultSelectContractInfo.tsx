'use client'

import Spinner from "@/components/Spinner"
import { ContractDesc } from "@/utils/types"
import { BigNumber, ethers } from "ethers"
import { useContractRead } from "wagmi"

export default function VaultContractInfo({
    title,
    contract,
    functionName,
    needFormat = false,
} : {
    title: string,
    contract: ContractDesc,
    functionName: string,
    needFormat?: boolean,
}) {

    const { data, isError, isLoading } = useContractRead({
        ...contract,
        functionName,
    })

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-medium">{title}</div>
            { isError ? <div>NA</div> : (
                isLoading ? <Spinner /> : (
                    <div>{needFormat ? ethers.utils.formatEther(data as BigNumber) : (data as BigNumber).toString()}</div>
                )
            )}
        </div>
    )
}