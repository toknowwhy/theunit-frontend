import { useAccount } from "wagmi";
import { allNetworkContracts, supportedNetworks } from "../../crypto/config";
import { NetworkInfo } from "../types";

export const useCurrentNetworkContracts = () : NetworkInfo|undefined => {
    const { chain } = useAccount();
    if (!chain || !supportedNetworks[chain.id]) {
        return undefined;
    }
    const chainId = chain.id;
    const contracts = allNetworkContracts[chainId];
    return Boolean(contracts) ? ({
        ...contracts!,
        name: chain?.name ?? '',
        id: chainId,
        nativeSymbol: chain?.nativeCurrency.symbol ?? 'ETH',
    }) : undefined;;
}