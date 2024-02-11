import { allBars } from "@/utils/db/getChartData";
import clientPromise from "@/utils/db/mongodb";

export default async function handler(req, res) {
  try {
    const { from, to, symbol, countback, resolution } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const result = await allBars(db, from, to, 'BTC', 'dogecoin', resolution);
    res.status(200).json({
      s: "ok",
      t: result.map((r) => (new Date(r.time)).getTime() / 1000),
      c: result.map((r) => r.close),
      o: result.map((r) => r.open),
      h: result.map((r) => r.high),
      l: result.map((r) => r.low),
      v: result.map((r) => r.volume)
    })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
