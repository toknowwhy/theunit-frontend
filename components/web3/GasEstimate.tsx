import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { ContractDesc } from "@/utils/types";
import { memo, useEffect, useState } from "react";
import { PublicClient, Address, parseEther, formatGwei } from "viem";
import { useFeeData } from "wagmi";

const GasEstimate = memo(function GasEstimate({
    publicClient,
    account,
    contract,
    args,
    value,
    functionName,
    unitPrice,
} : {
    publicClient: PublicClient,
    account: Address,
    contract: ContractDesc,
    args?: any[],
    value?: number,
    functionName: string,
    unitPrice: number,
}) {

    const {data: feeData} = useFeeData()
    const [gas, setGas] = useState<number>(0)
    const t = useVaultTranslations()

    useEffect(() => {
        (async function estimateGas() {
            const gas = await publicClient.estimateContractGas({
                account,
                ...contract,
                functionName,
                args,
                value: value ? parseEther(value.toString()) : undefined
            })
            setGas(parseFloat(formatGwei(gas)))
        })()
    }, [account, args, contract, functionName, publicClient, value])

    if (!feeData || !gas) {
        return null;
    }

    return (
        <div className='flex justify-between text-gray text-sm mt-2'>
            <div>{t('estimated-gas')}:</div>
            <div>Ø{(parseFloat(feeData.formatted.gasPrice ?? '0') * gas * unitPrice).toFixed(5)}</div>
        </div>
    )
})

export default GasEstimate;