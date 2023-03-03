import { TokenDesc } from "@/crypto/types";
import { BigNumber } from "ethers";
import { Dictionary } from "ts-essentials";

export type CustomSize = "small" | "medium" | "large" | "full";

export type VaultActionType =
 | 'deposit'
 | 'withdraw'
 | 'mint'
 | 'burn'

export interface VaultProp {
    collateral: TokenDesc;
    price: number;
    liquidationRatio: number;
    account?: string;
    balance?: number|string;
    vaultCollateralAmount?: BigNumber;
    vaultUnitDebt?: BigNumber;
}

export interface ThumbChartDataType {
    value: number;
    time: string;
}

export type CurrencyType = "BTC" | "ETH" | "USD"

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