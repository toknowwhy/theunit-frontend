const thumbChartLimit = 24;

export async function getUnitHourlyData(db, usd=false) {
    const lastData = await db.collection(usd ? "hourlydatausds" : "hourlydatas").find().sort({ "time": -1 }).limit(thumbChartLimit).toArray();
    return lastData.reverse().map((d) => {
        return {
            value: d.value,
            time: d.time.getTime()
        }
    });
}

export async function getETHHourlyData(db) {
    const lastData = await db.collection("coinhourlydatas").find({coin_id: 'ethereum'}).sort({ "time": -1 }).limit(thumbChartLimit).toArray();
    return lastData.reverse().map((d) => {
        return {
            value: 1 / d.price,
            time: d.time.getTime()
        }
    });
}