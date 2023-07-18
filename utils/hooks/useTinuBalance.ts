import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { useCurrentNetworkContracts } from "./useCurrentNetwork";

export const useTinuBalance = (account?: string) => {

    const contracts = useCurrentNetworkContracts()

    const { data, refetch } = useContractRead({
        ...contracts!.TinuToken,
        functionName: 'balanceOf',
        args: [account],
        enabled: Boolean(account) && Boolean(contracts),
    })
    return { balance: data as BigNumber|undefined, refetch };
}