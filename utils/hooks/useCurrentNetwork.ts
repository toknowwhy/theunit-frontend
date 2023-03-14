import { useNetwork } from "wagmi";
import { initialNetwork, Network, networkById } from "../../crypto/config";

export const useCurrentNetwork = () : Network => {
    const { chain } = useNetwork();
    const network = networkById[chain?.id ?? initialNetwork.id]
    return network ?? initialNetwork;
}