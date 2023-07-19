'use client'

import Spinner from "@/components/Spinner"
import { ContractDesc } from "@/utils/types"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
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

    const [contractData, setContractData] = useState<{
        data: BigNumber, 
        isError: boolean, 
        isLoading: boolean
    }>({data: BigNumber.from(0), isError: false, isLoading: true})

    const networkInfoData = useContractRead({
        ...contract,
        functionName,
    })

    const { data, isError, isLoading } = contractData;

    useEffect(() => {
        if (networkInfoData) {
            setContractData(networkInfoData as any)
        }
    }, [networkInfoData])

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-medium">{title}</div>
            { isError ? <div>NA</div> : (
                isLoading ? <Spinner small /> : (
                    <div>{needFormat ? ethers.utils.formatEther(data as BigNumber) : (data as BigNumber).toString()}</div>
                )
            )}
        </div>
    )
}