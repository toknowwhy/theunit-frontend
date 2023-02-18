import { useNetwork } from "wagmi";
import { initialNetwork, Network, networkById } from "../config";

export const useCurrentNetwork = () : Network => {
    const { chain } = useNetwork();
    return networkById[chain?.id ?? initialNetwork.id];
}