import { BigNumber } from "ethers";
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { AbiInput, AbiItem } from 'web3-utils'

/***************************** Database Types **********************************/

export interface CoinData {
    price: number,
    coin_id: string,
    market_cap: number,
    volume: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    high: number,
    low: number,
    name: string,
    symbol: string
    time: Date,
}

export interface CoinTableData extends CoinData {
    rank: number
}


/***************************** Crypto Types **********************************/

export type Abi = Omit<AbiItem, 'type' | 'stateMutability' | 'inputs'> & {
    internalType?: string
    type: string // 'function' | 'constructor' | 'event' | 'fallback'
    stateMutability?: string // 'pure' | 'view' | 'nonpayable' | 'payable'
    inputs?: (AbiInput & { internalType?: string })[]
}

export type Address = `0x${string}`;

export interface ContractDesc {
    abi: Abi[];
    address: Address;
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
| "unitToken"
| "unitRouter"
| "vault"
| "priceFeed"

export type ContractFunc = 
| "increaseCollateral"
| "increaseETH"
| "increaseCollateralAndMint"
| "approve"
| "decreaseCollateral"
| "decreaseETH"
| "decreaseCollateralAndBurn"
| "increaseETHAndMint"
| "decreaseETHAndBurn"

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

export interface AddressAndChain {
    account: string|undefined;
    chain: 4|undefined;
}


/***************************** Frontend Types **********************************/

export type CustomSize = "small" | "medium" | "large" | "full";

export type VaultActionType =
 | 'deposit'
 | 'withdraw'
 | 'mint'
 | 'burn'

export interface ThumbChartDataType {
    value: number;
    time: string;
}

export type CurrencyType = "BTC" | "ETH" | "USD"

export function instanceOfCurrencyType(object: any): object is CurrencyType {
    return object === "BTC" || object === "ETH" || object === "USD";
} 

export type ChartSymbolType = "UNITSATOSHI" | "UNITFINNEY" | "UNITUSD"

export interface CoinInfo {
    id: string;
    symbol: string;
    name: string;
}

export interface HistoryInfo {
    time: string;
    coins: CoinInfo[];
}

export interface PriceInfo {
    price: number;
    change: number;
    changePercentage: number;
}

export interface VaultInfoType {
    liquidationFee: number;
    minUnit: number;
    collateralAmount: BigNumber;
    unitAmount: BigNumber;
    currentPrice: number;
    nextPrice: number;
    gasPrice: number;
}

export interface VaultButtonProps {
    collateral: TokenDesc;
    collateralAmount: number;
    unitAmount: number;
    account?: string;
    disabled: boolean;
    isManage: boolean;
    gasPrice: number;
    reset: () => void;
}