import { BigNumber } from 'ethers'
import { AbiInput, AbiItem } from 'web3-utils'

export type Abi = Omit<AbiItem, 'type' | 'stateMutability' | 'inputs'> & {
    internalType?: string
    type: string // 'function' | 'constructor' | 'event' | 'fallback'
    stateMutability?: string // 'pure' | 'view' | 'nonpayable' | 'payable'
    inputs?: (AbiInput & { internalType?: string })[]
}

export interface ContractDesc {
    abi: Abi[];
    address: string;
}

export interface TokenDesc extends ContractDesc {
    coinId: string;
    name: string;
    symbol: string;
    stable: boolean;
}

export type TheUnitContracts = 
| "collateralManager"
| "unitToken"
| "unitRouter"
| "vault"
