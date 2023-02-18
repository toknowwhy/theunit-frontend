import { useCurrentNetwork } from "./useCurrentNetwork"

export const useSupportedCollaterals = () => {
    const currentNetwork = useCurrentNetwork();
    return currentNetwork.tokens;
}