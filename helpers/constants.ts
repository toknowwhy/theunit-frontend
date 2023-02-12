import { SupportedCoin } from "./types";

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
