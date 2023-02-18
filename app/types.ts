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