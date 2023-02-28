import { BigNumber } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { TheUnitContracts, UnitRouterFunc } from '../types';
import { useCurrentNetwork } from './useCurrentNetwork'

export const useContractFunc = (
    contract: TheUnitContracts, 
    functionName: UnitRouterFunc,
    args?: any[],
) => {
    const currentNetwork = useCurrentNetwork();
    const { config } = usePrepareContractWrite({
        address: currentNetwork[contract].address,
        abi: currentNetwork[contract].abi,
        functionName,
        args,
        overrides: {
            gasLimit: BigNumber.from(60000),
        }
    })
    const { data, error, isSuccess, writeAsync } = useContractWrite(config)
    return { data, error, isSuccess, writeAsync };
}