export type CustomSize = "small" | "medium" | "large" | "full";

export interface SupportedCoin {
    coinId: string;
    name: string;
    symbol: string;
}

export type VaultActionType =
 | 'deposit'
 | 'withdraw'
 | 'mint'
 | 'burn'