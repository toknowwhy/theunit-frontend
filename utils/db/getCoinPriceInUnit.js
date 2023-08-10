export async function getCoinPriceInUnit(db, coin) {
    const lastData = await db.collection("coinfiveminutedatas").find({coin_id: coin}).sort({ "time": -1 }).limit(1).toArray();
    if (lastData.length == 0) {
        return 0;
    }
    return lastData[0].price;
}