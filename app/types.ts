import { TokenDesc } from "@/crypto/types";
import { Dictionary } from "ts-essentials";

export type CustomSize = "small" | "medium" | "large" | "full";

export type VaultActionType =
 | 'deposit'
 | 'withdraw'
 | 'mint'
 | 'burn'

export interface VaultProp {
    id?: string;
    collateral: TokenDesc;
    t: Dictionary<string>;
    price: number;
    liquidationRatio: number;
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
    time: Date;
    coins: CoinInfo[];
}