import { getSymbolAndCurrency } from '@/utils/db/helpers';
import { supported_resolutions } from './config' 

export const baseSymbol = (data) => {
    const { symbol } = getSymbolAndCurrency(data);
    return {
        symbol,
        full_name: `${symbol} / UNIT`,
        description: `${symbol.toUpperCase()} in UNIT`,
        ticker: data,
        exchange: 'UNIT',
        type: 'crypto',
        name: symbol,
        session: '24x7',
        exchange: 'UNIT',
        listed_exchange: 'UNIT',
        timezone: 'Etc/UTC',
        format: 'price',
        has_intraday: true,
        pricescale: symbol === 'DOGE' || symbol === 'SHIB' ? 1000000 : 1000,
        minmov: 1,
        supported_resolutions,
    }
}

export default async function handler(req, res) {
    const { symbol } = req.query;
    res.status(200).json(baseSymbol(symbol));
}