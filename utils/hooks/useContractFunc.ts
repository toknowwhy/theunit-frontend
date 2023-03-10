import { BigNumber } from 'ethers';
import { Dictionary } from 'ts-essentials';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ContractDesc, ContractFunc, instanceOfContractDesc, TheUnitContracts } from '@/utils/types';
import { useCurrentNetwork } from './useCurrentNetwork'

export const useContractFunc = (
    contract: TheUnitContracts | ContractDesc, 
    functionName: ContractFunc,
    args?: any[],
    enabled?: boolean,
    overrides?: Dictionary<string|number|BigNumber>
) => {
    const currentNetwork = useCurrentNetwork();
    let desc;
    if (instanceOfContractDesc(contract)) {
        desc = { ...contract }
    } else {
        desc = {
            address: currentNetwork[contract].address,
            abi: currentNetwork[contract].abi,
        }
    }
    const { config } = usePrepareContractWrite({
        ...desc,
        functionName,
        args,
        enabled: enabled ?? true,
        overrides,
    })
    const { data, error, isSuccess, writeAsync, isLoading } = useContractWrite(config)
    return { data, error, isSuccess, writeAsync, isLoading };
}