import { Abi } from "viem";
import { Address, erc20ABI, useNetwork } from "wagmi";
import { allNetworkContracts, supportedNetworks } from "../../crypto/config";
import { NetworkInfo } from "../types";

export const useCurrentNetworkContracts = () : NetworkInfo|undefined => {
    const { chain } = useNetwork();
    if (!chain || !supportedNetworks[chain.id]) {
        return undefined;
    }
    const chainId = chain.id;
    const contracts = allNetworkContracts[chainId];
    return Boolean(contracts) ? ({
        ...contracts!,
        Wrapped: {
            address: supportedNetworks[chainId].wrappedNative as Address, 
            abi: erc20ABI as unknown as Abi
        },
        name: chain?.name ?? '',
        id: chainId,
        nativeSymbol: chain?.nativeCurrency.symbol ?? 'ETH',
    }) : undefined;;
}