import { getAllSymbols } from "@/app/db/getChartData";
import clientPromise from "@/app/db/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const coinsInfo = await getAllSymbols(db);
    res.status(200).json({ coinsInfo })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
