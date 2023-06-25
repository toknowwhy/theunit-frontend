import { useContractRead } from "wagmi";
import { ContractDesc, TokenDesc } from "@/utils/types";
import { BigNumber } from "ethers";

export const useCollateralBalance = (collateral: TokenDesc|ContractDesc, isETH = true, account?: string) => {

    const { data, refetch } = useContractRead({
        address: collateral?.address,
        abi: collateral?.abi,
        functionName: 'balanceOf',
        args: [account],
        enabled: Boolean(account) && !isETH,
    })
    return { balance: data as BigNumber|undefined, refetch };
}