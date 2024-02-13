import { getAllSymbols } from "@/utils/db/getChartData";
import clientPromise from "@/utils/db/mongodb";

export default async function handler(req, res) {
    const { query: symbol, limit } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db();
    const coinsInfo = await getAllSymbols(db);
    const symbols = 
      coinsInfo
        .filter((str) => str.symbol.toLowerCase().match(symbol.toLowerCase()))
        .slice(0, limit)
        .map((cc) => {
          const symbol = cc.symbol.toUpperCase();
          return {
            description: `${symbol} in UNIT`,
            exchange: 'UNIT',
            full_name: `${symbol} / UNIT`,
            symbol,
            ticker: cc.id,
            type: 'crypto',
          }
        });
    res.status(200).json(symbols)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
