import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { AbiInput, AbiItem } from 'web3-utils'

export type Abi = Omit<AbiItem, 'type' | 'stateMutability' | 'inputs'> & {
    internalType?: string
    type: string // 'function' | 'constructor' | 'event' | 'fallback'
    stateMutability?: string // 'pure' | 'view' | 'nonpayable' | 'payable'
    inputs?: (AbiInput & { internalType?: string })[]
}

export interface ContractDesc {
    abi: Abi[];
    address: `0x${string}`;
}

export interface TokenDesc extends ContractDesc {
    coinId: string;
    name: string;
    symbol: string;
    stable: boolean;
    decimals: number;
}

export function instanceOfContractDesc(object: any): object is ContractDesc {
    return 'abi' in object && 'address' in object;
}

export function instanceOfTokenDesc(object: any): object is TokenDesc {
    return 'decimals' in object;
}

export type TheUnitContracts = 
| "collateralManager"
| "unitToken"
| "unitRouter"
| "vault"

export type ContractFunc = 
| "increaseCollateral"
| "mint"
| "approve"

/**
 * A transaction is pending until it has either been cancelled, errored or succeeded.
 */
export enum TransactionState {
    pending = 'pending',
    complete = 'complete'
}
  
/**
 * A transaction progresses through these states linearly.
 * 1. pendingUserConfirmation
 * 2. pendingBlockchainConfirmation or cancelled
 * 3. success or error
 */
export enum TransactionStatus {
    pendingUserConfirmation = 'userConfirming',
    pendingBlockchainConfirmation = 'chainConfirming',
    cancelled = 'cancelled',
    success = 'success',
    error = 'error'
}

export interface Transaction {
    id: string
    name: string
    chainId: number
    usersAddress: string
    status: TransactionStatus
    state: TransactionState
    response?: TransactionResponse
    receipt?: TransactionReceipt
    callbacks?: TransactionCallbacks
}

export interface TransactionCallbacks {
    refetch?: (id: string) => void
    onConfirmedByUser?: (id: string) => void
    onSuccess?: (id: string) => void
    onSentToWallet?: (id: string) => void
    onCancelled?: (id: string) => void
    onComplete?: (id: string) => void
    onError?: (id: string) => void
}
  
export interface SendTransactionOptions {
    name: string
    callTransaction: () => Promise<TransactionResponse>
    callbacks?: TransactionCallbacks
}