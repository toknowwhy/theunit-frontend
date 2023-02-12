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