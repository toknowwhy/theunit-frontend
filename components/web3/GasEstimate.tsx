import { ethers } from "ethers";
import { memo } from "react";
import { useFeeData } from 'wagmi'

const GasEstimate = memo(function GasEstimate() {
    const { data, isSuccess } = useFeeData();
    return isSuccess && data?.gasPrice ? <div>{ethers.utils.formatEther(data!.gasPrice!)}</div> : <>Loading...</>
})

export default GasEstimate;