import { allBars } from "@/utils/db/getChartData";
import { getIDAndCurrency } from '@/utils/db/helpers';
import clientPromise from "@/utils/db/mongodb";

export default async function handler(req, res) {
  try {
    const { from, to, symbol, countback, resolution } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const { id, currency } = getIDAndCurrency(symbol);

    const result = await allBars(
      db, 
      from, 
      to, 
      currency,
      id.startsWith('UNIT') ? undefined : id, 
      resolution,
    );
    res.status(200).json({
      s: result.length == 0 ? "no_data" : "ok",
      t: result.map((r) => (new Date(r.time)).getTime() / 1000),
      c: result.map((r) => r.close),
      o: result.map((r) => r.open),
      h: result.map((r) => r.high),
      l: result.map((r) => r.low),
      v: result.map((r) => r.volume),
      nextTime: result.length == 0 ? (new Date()).getTime() + 30000 : undefined,
    })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
