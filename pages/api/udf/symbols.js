import { getIDAndCurrency, getCoinsInfo  } from '@/utils/db/helpers';
import clientPromise from "@/utils/db/mongodb";
import { supported_resolutions } from './config' 

export const baseSymbol = async (data, db) => {

    let symbolInfo = {};
    const { id } = getIDAndCurrency(data);
    if (id.startsWith('UNIT')) {
        const desc = `UNIT / ${id.split('UNIT')[1]}`
        symbolInfo = {
            symbol: id,
            ticker: id,
            full_name: desc,
            description: desc,
        };
    } else {
        const coinInfo = await getCoinsInfo(db, id);
        const symbol = coinInfo[id].symbol;
        symbolInfo = {
            symbol,
            full_name: `${symbol} / UNIT`,
            description: `${symbol.toUpperCase()} in UNIT`,
            ticker: data,
        };
    }

    const symbol = symbolInfo.symbol;

    return {
        ...symbolInfo,
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
    const client = await clientPromise;
    const db = client.db();
    const info = await baseSymbol(symbol, db);
    res.status(200).json(info);
}