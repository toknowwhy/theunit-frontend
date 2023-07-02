import { getCoinsInfo } from "./helpers";
import moment from 'moment';

export async function getAllSymbols(db) {
    const coinsInfo = await getCoinsInfo(db);
    return Object.values(coinsInfo); 
}

function getCorrectValue(data, isETH, cid) {
    let val = cid ? data.price : data.value;
    if (isETH) {
        val = 1 / val * 1000;
    }
    return val;
}

function getBarData(resHourData, start, end, isETH, cid, hasData) {
    const subarr = resHourData.slice(start, end);
    const valueKey = cid ? 'price' : 'value';
    const valueArr = subarr.map((sa) => sa[valueKey])
    const bar = {
        time: moment(subarr[0].time).toDate(),
        high: Math.max(...valueArr),
        low: Math.min(...valueArr),
        open: getCorrectValue(hasData ? resHourData[start-1] : subarr[0], isETH, cid),
        close: subarr[subarr.length-1][valueKey],
        volume: subarr.reduce((partialSum, a) => partialSum + a.volume, 0),
    };
    return bar;
}

export async function allBars(db, from, to, currency='BTC', coinId, resolution) {
    let resHourData;
    const isETH = currency === 'ETH';
    const mins = parseInt(resolution);
    const isMinuteData = mins > 1;
    const cid = isETH ? 'ethereum' : coinId;
    if (cid) {
        resHourData = await db
                                .collection(isMinuteData ? 'coinfiveminutedatas': 'coinhourlydatas')
                                .find({ "time" : {"$gte": new Date(from*1000), "$lte": new Date(to*1000)}, "coin_id": cid })
                                .sort({'time': 1})
                                .toArray();
    } else {
        const model = `${isMinuteData ? 'fiveminute' : 'hourly'}${currency === "USD" ? 'datausds' : 'datas'}`;
        resHourData = await db
                                .collection(model)
                                .find({ "time" : {"$gte": new Date(from*1000), "$lte": new Date(to*1000)} })
                                .sort({'time': 1})
                                .toArray();
    }

    if (isMinuteData) {
        const bars = [];
        let counter = resHourData.length;
        const dataCount = mins / 5; // We store data every 5 minutes
        while (counter > dataCount) {
            const bar = getBarData(resHourData, counter-dataCount, counter, isETH, cid, true)
            bars.push(bar)
            counter -= dataCount;
        }
        if (counter > 0) {
            const bar = getBarData(resHourData, 0, counter, isETH, cid, false)
            bars.push(bar)
        }

        return bars.reverse();
    }

    let res = {};
    let oldTimeStr = '';
    for (let j = 0; j < resHourData.length; j++) {
        const hdata = resHourData[j];
        const val = getCorrectValue(hdata, isETH, cid)
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
        const val = getCorrectValue(hdata, isETH, cid)
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
