import { SupportedCoin, VaultActionType } from "./types";

export const SUPPORTED_COINS: SupportedCoin[] = [
    {
        coinId: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
    }
];

export const SUPPORTED_STABLE_COINS: SupportedCoin[] = [
    {
        coinId: "dai",
        name: "Dai",
        symbol: "DAI",
    },
    {
        coinId: "usdc",
        name: "USD Coin",
        symbol: "USDC",
    },
    {
        coinId: "usdt",
        name: "Tether",
        symbol: "USDT",
    },
];

export const VAULT_COLLATERAL_ACTIONS: VaultActionType[] = [
    "deposit",
    "withdraw",
]

export const VAULT_UNIT_ACTIONS: VaultActionType[] = [
    "mint",
    "burn",
]
