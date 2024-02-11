import { getAllSymbols } from "@/utils/db/getChartData";
import clientPromise from "@/utils/db/mongodb";
import { baseSymbol } from "./symbols";

export default async function handler(req, res) {
    const { query: symbol, limit } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db();
    const coinsInfo = await getAllSymbols(db);
    const symbols = 
      coinsInfo
        .map((ci) => ci.symbol)
        .filter((str) => str.match(symbol))
        .slice(0, limit)
        .map((cc) => baseSymbol(cc));
    res.status(200).json(symbols)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
