export const thumbChartLimit = 25;

const getCoinsDatasInfo = (coinsDatas) => {
    let resj = {};
    for (let i=0; i<coinsDatas.length; i++) {
        const cd = coinsDatas[i];
        const cid = cd["cid"];
        resj[cid] = {
            id: cid,
            name: cd["name"],
            symbol: cd["symbol"]
        }
    }
    return resj;
}

const getCoinIdFromSymbol = (coinsData, symbol) => {
    let keys = Object.keys(coinsData);
    for (let i=0;i<keys.length;i++) {
        const coinId = keys[i];
        if (symbol === coinsData[coinId]["symbol"]) {
            return coinId;
        }
    }
    return "bitcoin";
}

export async function getUnitHistory(db) {
    const idsData = await db.collection("unitcoinshistories").find({}).sort({time: -1}).limit(1).toArray();
    return idsData[0].coins
}

export async function getUNITInUSD(db) {
    const latestData = await db.collection("hourlydatausds").find({}).sort({time: -1}).limit(1).toArray();
    return latestData[0].value
}

export async function getCoinsInfo(db, cid) {
    const coinsDatas = await db.collection("tokeninfos").find(cid ? {cid} : {}).toArray();
    return getCoinsDatasInfo(coinsDatas);
}

export async function getStableCoins(db) {
    let stableCoins;
    let stableData = await db.collection("allstablecoins").find().toArray();
    if (stableData && stableData.length > 0) {
        stableCoins = stableData[0].coins;
    } else {
        stableCoins = ['tether', 'usd-coin', 'binance-usd', 'wrapped-bitcoin', 'dai', 'compound-usd-coin', 'compound-dai', 'compound-ether', 'cdai', 'staked-ether', 'terrausd', 'magic-internet-money', 'huobi-btc'];
    }
    return stableCoins;
}

export async function getBitcoinChange(db) {
    const lastData = await db
                            .collection("coinhourlydatas")
                            .find({coin_id: 'bitcoin'})
                            .sort({ "time": -1 })
                            .limit(thumbChartLimit)
                            .toArray();
    const endValue = lastData[0].price;
    const startValue = lastData[lastData.length-1].price;
    const change = endValue - startValue;
    const changePerc = change / startValue * 100;
    return { change, changePerc }

}

export function getSymbolAndCurrency(symbol) {
    const arr = symbol.split(':');
    return {
        symbol: arr[0],
        currency: arr[1],
    }
}