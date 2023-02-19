const thumbChartLimit = 32;

export async function getUnitDailyData(db, usd=false) {
    const lastData = await db.collection("dailydatas").find().sort({ "time": -1 }).limit(thumbChartLimit).toArray();
    return lastData.reverse();
}

export async function getETHDailyData(db) {
    const lastData = await db.collection("dailydatas").find().sort({ "_id": -1 }).limit(thumbChartLimit).toArray();
}