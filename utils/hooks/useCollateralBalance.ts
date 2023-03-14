import { formatUnits } from "ethers/lib/utils.js";
import { useContractRead } from "wagmi";
import { ContractDesc, instanceOfTokenDesc, TokenDesc } from "@/utils/types";

export const useCollateralBalance = (collateral: TokenDesc|ContractDesc, account?: string) => {

    const { data, refetch } = useContractRead({
        address: collateral?.address,
        abi: collateral?.abi,
        functionName: 'balanceOf',
        args: [account],
        enabled: Boolean(account),
    })
    let decimals = collateral && instanceOfTokenDesc(collateral) ? collateral.decimals : 18;
    const balance = data ? parseFloat(formatUnits(data.toString(), decimals)) : 0;
    return { balance, refetch };
}