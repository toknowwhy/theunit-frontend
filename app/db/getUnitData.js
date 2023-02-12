import { coinLogoUrl } from "@/helpers/coinLogoUrl";
import { getCoinsInfo, getUnitHistory } from "./helpers";

export default async function getUnitData(db) {
    const ids = await getUnitHistory(db);
    const data = await db.collection("coinhourlydatas").find({ coin_id: { $in: ids } }).sort({'time': -1}).limit(ids.length).toArray();
    const coinsData = await getCoinsInfo(db);
    
    let result = [];
    for (var i=0;i<data.length;i++) {
        const coin = data[i];
        const cid = coin.coin_id;
        var coinName;
        var coinSymbol;
        if (coinsData[cid] === undefined) {
            coinName = cid;
            coinSymbol = cid;
        } else {
            coinName = coinsData[cid]["name"];
            coinSymbol = coinsData[cid]["symbol"];
        }
        var resCoin = {
            ...coin, 
            name: coinName, 
            symbol: coinSymbol,
            image: coinLogoUrl(cid)
        };

        // Remove the not keys that make coin not serializable
        // to pass to client component
        delete resCoin.time;
        delete resCoin._id;
        delete resCoin.__v;

        result.push(resCoin);
    }

    result.sort((a, b) => {
        return b.market_cap - a.market_cap;
    })

    return result;
}