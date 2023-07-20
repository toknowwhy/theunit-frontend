'use client'

import Spinner from "@/components/Spinner"
import { ContractDesc, VaultContractInfoType } from "@/utils/types"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"

export default function VaultContractInfo({
    title,
    contract,
    functionName,
    type,
} : {
    title: string,
    contract: ContractDesc,
    functionName: string,
    type: VaultContractInfoType,
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
        if (networkInfoData && !contractData) {
            setContractData(networkInfoData as any)
        }
    }, [networkInfoData, contractData])

    let resData = 'NA';
    if (data) {
        if (type === 'dustLimit') {
            resData = parseFloat(ethers.utils.formatEther(data as BigNumber)).toFixed(0);
        } else if (type === 'liqiuidationRatio') {
            resData = ((data as BigNumber).toNumber() / 10).toFixed(0) + '%';
        }
    }

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-medium">{title}</div>
            { isError ? <div>NA</div> : (
                isLoading ? <Spinner small /> : (
                    <div>{resData}</div>
                )
            )}
        </div>
    )
}