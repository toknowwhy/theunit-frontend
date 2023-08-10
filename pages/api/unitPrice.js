import { getCoinPriceInUnit } from "@/utils/db/getCoinPriceInUnit";
import clientPromise from "@/utils/db/mongodb";

export default async function handler(req, res) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const { coin } = req.query;
      const price = await getCoinPriceInUnit(db, coin);
      res.status(200).json({ price })
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' })
    }
  }
  