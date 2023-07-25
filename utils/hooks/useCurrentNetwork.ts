import { Abi } from "viem";
import { Address, erc20ABI, useNetwork } from "wagmi";
import { allNetworkContracts, networkConigs, supportedChainIds } from "../../crypto/config";
import { NetworkInfo, SupportedChainId } from "../types";

export const useCurrentNetworkContracts = () : NetworkInfo|undefined => {
    const { chain } = useNetwork();
    if (!chain || supportedChainIds.indexOf(chain.id) == -1) {
        return undefined;
    }
    const chainId = chain.id as SupportedChainId;
    const contracts = allNetworkContracts[chainId];
    return Boolean(contracts) && networkConigs[chainId] ? ({
        ...contracts!,
        Wrapped: {
            address: networkConigs[chainId].wrappedNative as Address, 
            abi: erc20ABI as unknown as Abi
        },
        name: chain?.name ?? '',
        id: chainId,
        nativeSymbol: chain?.nativeCurrency.symbol ?? 'ETH',
    }) : undefined;
}