import { getCoinsInfo } from "./helpers";
import moment from 'moment';

export async function getAllSymbols(db) {
    const coinsInfo = await getCoinsInfo(db);
    return Object.values(coinsInfo); 
}

export async function allBars(db, from, to, currency='BTC', coinId) {
    let resHourData;
    const isETH = currency === 'ETH';
    const cid = isETH ? 'ethereum' : coinId;
    if (cid) {
        resHourData = await db
                                .collection('coinhourlydatas')
                                .find({ "time" : {"$gte": new Date(from*1000), "$lte": new Date(to*1000)}, "coin_id": cid })
                                .sort({'time': 1})
                                .toArray();
    } else {
        const model = currency === "USD" ? 'hourlydatausds' : 'hourlydatas';
        resHourData = await db
                                .collection(model)
                                .find({ "time" : {"$gte": new Date(from*1000), "$lte": new Date(to*1000)} })
                                .sort({'time': 1})
                                .toArray();
    }

    let res = {};
    let oldTimeStr = '';
    for (let j = 0; j < resHourData.length; j++) {
        const hdata = resHourData[j];
        let val = cid ? hdata.price : hdata.value;
        if (isETH) {
            val = 1 / val * 1000;
        }
        const timeStr = moment(hdata.time).format('YYYY-MM-DD');
        if (!res[timeStr]) {
            const bar = {
                time: new Date(timeStr),
                high: val,
                low: val,
                open: val,
                close: val,
                volume: parseFloat(hdata.volume.toFixed(3)),
            };
            res[timeStr] = bar;
        } else {
            const bar = res[timeStr];
            if (bar.high < val) {
                res[timeStr].high = val;
            }
            if (bar.low > val) {
                res[timeStr].low = val;
            }
            if (timeStr !== oldTimeStr) {
                oldTimeStr = timeStr;
            } else {
                res[timeStr].close = val;
            }
        }
    }

    const keys = Object.keys(res).sort();
    let bars = [];
    for (let q = 0; q < keys.length; q++) {
        const barVal = res[keys[q]];
        if (q < (keys.length - 1)) {
            barVal.close = res[keys[q+1]].open;
        }
        bars.push(barVal);
    }

    if (bars.length == 0) {
        return [];
    }

    // Since hourly data only started from January 2022, we need to use daily data for the data before this data
    const startTime = moment(bars[0].time).subtract(1, 'day').toDate();
    let resDailyData;
    if (cid) {
        resDailyData = await db
                                .collection('coindailydatas')
                                .find({ "time" : {"$lte": startTime}, "coin_id": cid })
                                .sort({'time': 1})
                                .toArray();
    } else {
        const model = currency === "USD" ? 'dailydatausds' : 'dailydatas';
        resDailyData = await db.collection(model).find({ "time" : {"$lte": startTime} }).sort({'time': 1}).toArray();
    }

    let dailyRes = [];
    for (let q = 0; q < resDailyData.length; q++) {
        const hdata = resDailyData[q];
        let val = cid ? hdata.price : hdata.value;
        if (currency === "eth") {
            val = 1 / val * 1000
        }
        const bar = {
            time: hdata.time,
            high: val,
            low: val,
            open: val,
            close: val,
            volume: parseFloat(hdata.volume.toFixed(3)),
        };
        if (dailyRes.length > 0) {
            dailyRes[dailyRes.length - 1].close = val;
        }
        dailyRes.push(bar);
    }
    const resData = dailyRes.concat(bars);

    return resData;
}
