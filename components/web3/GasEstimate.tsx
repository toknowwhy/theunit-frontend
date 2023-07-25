import { memo } from "react";
import { formatEther } from "viem";
import { useFeeData } from 'wagmi'

const GasEstimate = memo(function GasEstimate() {
    const { data, isSuccess } = useFeeData();
    return isSuccess && data?.gasPrice ? <div>{formatEther(data!.gasPrice!)}</div> : <>Loading...</>
})

export default GasEstimate;