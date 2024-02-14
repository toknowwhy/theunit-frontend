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

function getBarData(subarr, isETH, cid, prevData) {
    const valueKey = cid ? 'price' : 'value';
    const valueArr = subarr.map((sa) => sa[valueKey])
    const bar = {
        time: moment(subarr[0].time).toDate(),
        high: Math.max(...valueArr),
        low: Math.min(...valueArr),
        open: getCorrectValue(prevData ?? subarr[0], isETH, cid),
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
                                .find({ "time" : {"$lte": new Date(to*1000)}, "coin_id": cid })
                                .sort({'time': 1})
                                .toArray();
    } else {
        const model = `${isMinuteData ? 'fiveminute' : 'hourly'}${currency === "USD" ? 'datausds' : 'datas'}`;
        resHourData = await db
                                .collection(model)
                                .find({ "time" : {"$lte": new Date(to*1000)} })
                                .sort({'time': 1})
                                .toArray();
    }

    if (isMinuteData) {
        const bars = [];
        const total = resHourData.length;
        let lastData = resHourData[total-1];
        const mod = (new Date(lastData.time)).getMinutes() % mins;

        let counter = total-1;
        let nextTime = moment(lastData.time).subtract(mod > 0 ? mod : mins, 'minutes');
        while (counter >= 500) {
            let subarr = [];
            while (counter >=0 && moment(resHourData[counter].time).isAfter(nextTime)) {
                subarr.push(resHourData[counter]);
                counter--;
            }
            const bar = getBarData(subarr, isETH, cid, resHourData[counter])
            bars.push(bar);
            nextTime = nextTime.subtract(mins, 'minutes');
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

    let latestDataModel = currency === "USD" ? "fiveminutedatausds" : "fiveminutedatas";
    let latestDataFileter = {};
    if (cid) {
        latestDataModel = currency === "USD" ? "coinfiveminutedatausds" : "coinfiveminutedatas"
        latestDataFileter = {coin_id: cid, price: { $exists: true }};
    }

    const latestData = await db
                .collection(latestDataModel)
                .find(latestDataFileter)
                .sort({ "time": -1 })
                .limit(1)
                .toArray();

    const keys = Object.keys(res).sort();
    let bars = [];
    for (let q = 0; q < keys.length; q++) {
        const barVal = res[keys[q]];
        if (q < (keys.length - 1)) {
            barVal.close = res[keys[q+1]].open;
        } else {
            const latestVal = getCorrectValue(latestData[0], isETH, cid)
            barVal.close = latestVal;
            if (latestVal > barVal.high) {
                barVal.high = latestVal;
            } else if (latestVal < barVal.low) {
                barVal.low = latestVal;
            }
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
