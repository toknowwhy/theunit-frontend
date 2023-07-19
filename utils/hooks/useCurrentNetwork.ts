import { Address, erc20ABI, useNetwork } from "wagmi";
import { allNetworkContracts, networkConigs } from "../../crypto/config";
import { Abi, NetworkInfo } from "../types";

export const useCurrentNetworkContracts = () : NetworkInfo|undefined => {
    const { chain } = useNetwork();
    const chainId = chain?.id ?? -1;
    const contracts = allNetworkContracts[chainId];
    return contracts && networkConigs[chainId] ? ({
        ...contracts,
        Wrapped: {
            address: networkConigs[chainId].wrappedNative as Address, 
            abi: erc20ABI as unknown as Abi[]
        },
        name: chain?.name ?? '',
        id: chainId,
        nativeSymbol: chain?.nativeCurrency.symbol ?? 'ETH',
    }) : undefined;
}