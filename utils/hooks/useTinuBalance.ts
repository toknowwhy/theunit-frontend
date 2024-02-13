import { useReadContract } from "wagmi";
import { useContracts } from "@/components/vaults/VaultNetworkProvider";

export const useTinuBalance = (account?: string) => {

    const contracts = useContracts()

    const { data, refetch } = useReadContract({
        ...contracts!.TinuToken,
        functionName: 'balanceOf',
        args: [account],
        query: {
            enabled: Boolean(account) && Boolean(contracts),
        }
    })
    return { balance: data as bigint|undefined, refetch };
}