import { useContract } from "wagmi";
import { TheUnitContracts } from "../types"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const useContractByType = (type: TheUnitContracts) => {
    const currentNetwork = useCurrentNetwork();
    const contractDesc = currentNetwork[type];
    const contract = useContract({ ...contractDesc });
    return contract;
}