import { defaultSupportedCollaterals } from "../../crypto/config";
import { useCurrentNetworkContracts } from "./useCurrentNetwork"

export const useSupportedCollaterals = () => {
    const currentNetwork = useCurrentNetworkContracts();
    return currentNetwork?.tokens ?? defaultSupportedCollaterals;
}