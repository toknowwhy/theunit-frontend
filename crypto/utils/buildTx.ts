import { TransactionResponse } from '@ethersproject/providers';
import { Contract, ContractInterface } from 'ethers';
import { ContractDesc, ContractFunc } from '../types';
import { Signer } from "ethers"

export const buildTx = (
    contractDesc: ContractDesc, 
    functionName: ContractFunc,
    signer: Signer,
    args?: any[],
) => {
    const { address, abi } = contractDesc;
    const contract = new Contract(address, abi as ContractInterface, signer)
    const params = args ?? [];
    const contractCall: () => Promise<TransactionResponse> = contract[functionName].bind(null, ...params)
    return contractCall
}