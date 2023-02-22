import { getCandidates } from './getUnitData';
import { 
    thumbChartLimit, 
    getCoinsInfo, 
    getUnitHistory,
} from './helpers';

export async function getCoinHourlyData(db, coinId) {
    const coinsInfo = await getCoinsInfo(db, coinId);
    const lastData = await db
                            .collection("coinhourlydatas")
                            .find({coin_id: coinId})
                            .sort({ "time": -1 })
                            .limit(thumbChartLimit)
                            .toArray();

    const unitCoinIds = await getUnitHistory(db);
    const candidates = await getCandidates(db, unitCoinIds);
    const candidateIds = candidates.map((c) => c.coin_id);
    const nids = unitCoinIds.concat(candidateIds);
    const rank = nids.indexOf(coinId);

    return lastData.reverse().map((d) => {
        return {
            ...d,
            value: d.price,
            name: coinsInfo[coinId]?.name,
            symbol: coinsInfo[coinId]?.symbol,
            rank: (rank+1)
        }
    });
}