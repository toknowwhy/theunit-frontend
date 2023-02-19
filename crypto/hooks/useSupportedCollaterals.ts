import { basicTokens } from "../config";
import { useCurrentNetwork } from "./useCurrentNetwork"

export const useSupportedCollaterals = () => {
    const currentNetwork = useCurrentNetwork();
    return currentNetwork?.tokens ?? basicTokens;
}