import { useCurrentNetwork } from "./useCurrentNetwork"

export const useTokenDesc = (symbol: string) => {
    const currentNetwork = useCurrentNetwork();
    if (!currentNetwork) {
        return null;
    }
    const arr = currentNetwork.tokens.filter((t) => t.symbol === symbol);
    return arr.length > 0 ? arr[0] : null;
}