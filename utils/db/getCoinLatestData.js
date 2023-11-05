import { getCandidates } from './getUnitData';
import { 
    getBitcoinChange,
    getCoinsInfo, 
    getUnitHistory,
    getUNITInUSD
} from './helpers';

export async function getCoinLatestData(db, coinId) {
    const coinsInfo = await getCoinsInfo(db, coinId);
    const lastData = await db
                            .collection("coinfiveminutedatas")
                            .find({coin_id: coinId, price: { $exists: true }})
                            .sort({ "time": -1 })
                            .limit(1)
                            .toArray();

    if (lastData.length == 0) {
        return null;
    }

    let rank;
    const unitIds = await getUnitHistory(db);
    if (unitIds.indexOf(coinId) > -1) {
        rank = unitIds.indexOf(coinId);
    } else {
        const candidates = await getCandidates(db, unitIds);
        const candidateIds = candidates.map((cde) => cde.coin_id)
        rank = unitIds.length + candidateIds.indexOf(coinId);
    }

    const d = lastData[0];
    const unitInUSD = await getUNITInUSD(db);

    const resObj = {
        ...d,
        value: d.price,
        price_change_24h: d.price_change_24h / unitInUSD,
        name: coinsInfo[coinId]?.name,
        symbol: coinsInfo[coinId]?.symbol,
        rank: (rank+1)
    }

    if (coinId === 'bitcoin') {
        const changes = await getBitcoinChange(db);
        resObj.price_change_24h = changes.change;
        resObj.price_change_percentage_24h = changes.changePerc;
    }

    return resObj;
}