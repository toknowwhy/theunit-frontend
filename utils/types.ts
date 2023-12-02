import { ReactElement, ReactNode } from "react";
import { Address, Chain } from "wagmi";
import { Abi, Hex } from "viem";

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

export interface ContractDesc {
    abi: Abi;
    address: Address;
}

export interface TokenDesc extends ContractDesc {
    coinId: string;
    name: string;
    symbol: string;
    stable: boolean;
    decimals: number;
}

export interface CollateralInfo {
    symbol: string;
    dustLimit: number;
    address?: Address;
    splineLogo: string;
    liquidationRatio: number;
    unitId: string;
    priceFeed: Address;
}

export interface NetworkConfig {
    chain: Chain,
    sloganKey: string,
    subgraphUrl: string,
    bridgedUN: Address,
    tickets: Address[],
    supportedCollaterals: CollateralInfo[],
}

export interface ContractDeployedInfo {
    deployments: { [chainId: string]: Address },
    abi: Abi
}

export interface NetworkContracts {
    VaultPriceFeed: ContractDesc;
    RouterV1: ContractDesc;
    TinuToken: ContractDesc;
    UnitPriceFeed: ContractDesc;
    Vault: ContractDesc;
    TicketFactory: ContractDesc;
}

export type AllContracts = {
    [chain: string]: NetworkContracts
}

export interface NetworkInfo extends NetworkContracts {
    id: number;
    name: string;
    nativeSymbol: string;
}

export interface NetworkInfoWithCollateral extends NetworkInfo {
    collateral: CollateralInfo;
}

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
| "increaseETHAndBurn"
| "decreaseETHAndMint"

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
    receipt?: SimpleReceipt
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

export interface TransactionResponse {
    hash: string;
    chainId: number;
}

export type WriteResponse = () => Promise<`0x${string}`>
  
export interface SendTransactionOptions {
    name: string
    callTransaction: WriteResponse
    callbacks?: TransactionCallbacks
}

export interface AddressAndChain {
    account: string|undefined;
    chain: 4|undefined;
}

export interface VaultEvent {
    id: string
    owner: string
    name: string
    unitDebt: bigint
    collateralToken: string
    liquidationPrice: bigint
}

export interface SimpleReceipt {
    transactionHash: string;
    status: string;
    logs: any[];
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

export type VaultContractInfoType = "liqiuidationRatio" | "dustLimit"

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
    collateralAmount: bigint;
    unitAmount: bigint;
    currentPrice: number;
    nextPrice: number;
}

export interface VaultButtonProps {
    collateral: string;
    collateralAmount: number;
    unitAmount: number;
    account?: Address;
    owner?: Address;
    disabled: boolean;
    isManage: boolean;
    isClosing?: boolean;
    unitPrice: number;
    collateralBalance?: bigint,
    unitBalance?: bigint,
    reset: () => void;
}

export type TransType = string | ReactElement | ReactNode

export interface LockAPY {
    months: number;
    apy: number;
}

export interface LockLP {
    amount: number;
    days: number;
}

export interface FarmBoxProps {
    ethToTinuPrice: number;
    ethToUnPrice: number;
    unToTinuPrice: number;
    totalRewards: number;
    accessibleRewards: number;
    ethLP: number;
    unLP: number;
    ethLPLocked: number;
    unLPLocked: number;
    ethLockedLPs: LockLP[];
    unLockedLPs: LockLP[];
    collateral: string;
    account?: Address;
}

export interface LPBoxProps extends FarmBoxProps {
    isUNPool: boolean;
}

export interface SiteLocale {
    locale: string;
    title: string;
}

export interface TabItem<T> {
    title: string;
    value: T;
    icon?: string;
}

export type DiscoverRank = 'risk' | 'debt'
