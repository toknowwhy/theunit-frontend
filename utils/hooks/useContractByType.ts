import { useContract } from "wagmi";
import { TheUnitContracts } from "@/utils/types"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const useContractDescByType = (type: TheUnitContracts) => {
    const currentNetwork = useCurrentNetwork();
    return currentNetwork ? currentNetwork[type] : null;
}

export const useContractByType = (type: TheUnitContracts) => {
    const contractDesc = useContractDescByType(type);
    const contract = useContract({ ...contractDesc });
    return contract;
}
