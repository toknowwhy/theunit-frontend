import { formatEther, formatUnits, parseEther, parseUnits } from "ethers/lib/utils.js";
import { useAccount, useContractRead } from "wagmi";
import { TokenDesc } from "../types";

export const useCollateralBalance = (collateral: TokenDesc) => {
    const { address } = useAccount();
    const { data, error } = useContractRead({
        address: collateral.address,
        abi: collateral.abi,
        functionName: 'balanceOf',
        args: [address]
    })
    const balance = data ? formatUnits(data.toString(), collateral.decimals) : 0;
    return { account: address, balance };
}