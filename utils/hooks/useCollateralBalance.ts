import { formatUnits } from "ethers/lib/utils.js";
import { useAccount, useContractRead } from "wagmi";
import { ContractDesc, instanceOfTokenDesc, TokenDesc } from "@/utils/types";

export const useCollateralBalance = (collateral: TokenDesc|ContractDesc) => {
    const { address } = useAccount();
    const { data } = useContractRead({
        address: collateral.address,
        abi: collateral.abi,
        functionName: 'balanceOf',
        args: [address]
    })
    let decimals = instanceOfTokenDesc(collateral) ? collateral.decimals : 18;
    const balance = data ? parseFloat(formatUnits(data.toString(), decimals)) : 0;
    return { account: address, balance };
}