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

export const isCoinSupported = (coinId: string) => {
    const arr = SUPPORTED_COINS.concat(SUPPORTED_STABLE_COINS);
    for (let i=0; i<arr.length; i++) {
        if (arr[i].coinId === coinId) {
            return true;
        }
    }
    return false;
}