import { useContractRead } from "wagmi";
import { useVaultContracts } from "@/components/vaults/VaultNetworkProvider";

export const useTinuBalance = (account?: string) => {

    const contracts = useVaultContracts()

    const { data, refetch } = useContractRead({
        ...contracts!.TinuToken,
        functionName: 'balanceOf',
        args: [account],
        enabled: Boolean(account) && Boolean(contracts),
    })
    return { balance: data as bigint|undefined, refetch };
}