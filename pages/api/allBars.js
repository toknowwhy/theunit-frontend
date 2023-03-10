import { allBars } from "@/app/db/getChartData";
import clientPromise from "@/utils/db/mongodb";

export default async function handler(req, res) {
  try {
    const { from, to, currency, coinId } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const result = await allBars(db, from, to, currency, coinId);
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
