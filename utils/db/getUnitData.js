import { getBitcoinChange, getCoinsInfo, getStableCoins, getUnitHistory } from "./helpers";

export async function getCandidates(db, ids) {
    const stableCoins = await getStableCoins(db);
    const mids = ids.concat(stableCoins);
    const lastData = await db.collection("coinfiveminutedatas").find().sort({ "_id": -1 }).limit(1).toArray();
    const lastTime = lastData[0].time;
    const nowTime = new Date(lastTime.getTime() - 120000);
    const data = await db
                        .collection("coinfiveminutedatas")
                        .find({ coin_id: { $nin: mids }, "time" : {"$gte": nowTime}, price: { $exists: true } })
                        .sort({'market_cap': -1})
                        .limit(ids.length)
                        .toArray();
    return data;
}

export default async function getUnitData(db, isCandidate=false) {
    const ids = await getUnitHistory(db);
    let data;
    if (isCandidate) {
        data = await getCandidates(db, ids);
    } else {
        data = await db.collection("coinfiveminutedatas")
                        .find({ coin_id: { $in: ids }, price: { $exists: true } })
                        .sort({'time': -1})
                        .limit(ids.length)
                        .toArray();
    }
    const coinsData = await getCoinsInfo(db);

    data.sort((a, b) => {
        return b.market_cap - a.market_cap;
    })
    
    let result = [];
    for (let i=0;i<data.length;i++) {
        const coin = data[i];
        const cid = coin.coin_id;
        let coinName;
        let coinSymbol;
        if (coinsData[cid] === undefined) {
            coinName = cid;
            coinSymbol = cid;
        } else {
            coinName = coinsData[cid]["name"];
            coinSymbol = coinsData[cid]["symbol"];
        }
        let resCoin = {
            ...coin, 
            name: coinName, 
            symbol: coinSymbol,
            key: cid,
            rank: (i+1)
        };

        if (cid === 'bitcoin') {
            const changes = await getBitcoinChange(db);
            resCoin.price_change_24h = changes.change;
            resCoin.price_change_percentage_24h = changes.changePerc;
        }

        // Remove the not keys that make coin not serializable
        // to pass to client component
        delete resCoin.time;
        delete resCoin._id;
        delete resCoin.__v;

        result.push(resCoin);
    }

    return result;
}