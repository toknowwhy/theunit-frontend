import { SUPPORTED_COINS, SUPPORTED_STABLE_COINS } from "./constants";

export const numberWithCommas = (x: string | undefined) => {
    if (x != undefined) {
        var parts = x.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
    return '';
};

export const coinLogoUrl = (coinId: string) => {
    return 'https://api.20y.org/files/logos/' + coinId + '.png';
};

export const getCoinFromId = (coinId: string) => {
    const arr = SUPPORTED_COINS.concat(SUPPORTED_STABLE_COINS);
    for (let i=0; i<arr.length; i++) {
        if (arr[i].coinId === coinId) {
            return arr[i];
        }
    }
    return null;
}

export const getMinutesToNextHour = () => {
    return Math.floor((3600000 - new Date().getTime() % 3600000) / 1000 / 60);
}

export const renderPrice = (price: number) => 'Ø' + (price < 0.001 ? price.toFixed(6) : price.toFixed(3));

export const renderBigNumber = (num: number) => numberWithCommas((num / 1000000).toFixed(0))