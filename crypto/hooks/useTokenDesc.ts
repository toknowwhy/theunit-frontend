import { useCurrentNetwork } from "./useCurrentNetwork"

export const useTokenDesc = (symbol: string) => {
    const currentNetwork = useCurrentNetwork();
    return currentNetwork.tokens[symbol];
}