import { getCoinsInfo } from "./helpers";

export const historyPageSize = 12;

export async function getUnitHistories(db, page=1) {
    const coinData = await db
                            .collection('unitcoinshistories')
                            .find()
                            .sort({ "time": -1 })
                            .skip( ( page - 1 ) * historyPageSize )
                            .limit(historyPageSize)
                            .toArray();
    const coinInfo = await getCoinsInfo(db);
    const finalRes = [];
    for (var i=0;i<coinData.length;i++) {
        const coins = coinData[i].coins;
        const res = coins.map((c) => {
            return { ...coinInfo[c] }
        })
        finalRes.push({
            time: coinData[i].time,
            coins: res
        })
    }
    return finalRes;
}

export async function getHistoryCount(db) {
    const res = await db.collection('unitcoinshistories').estimatedDocumentCount();
    return res;
}