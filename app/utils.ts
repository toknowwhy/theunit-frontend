import { CurrencyType, PriceInfo, ThumbChartDataType } from "./types";
import BTC from '@/public/btc.svg';
import ETH from '@/public/eth.svg';
import USD from '@/public/usd.svg';
import { ethers } from "ethers";

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

export const getMinutesToNextHour = () => {
    return Math.floor((3600000 - new Date().getTime() % 3600000) / 1000 / 60);
}

export const renderPrice = (price: number) => 'Ø' + (price < 0.001 ? price.toFixed(6) : price.toFixed(3));

export const renderBigNumber = (num: number) => numberWithCommas((num / 1000000).toFixed(0))

export const getPriceInfo = (data: ThumbChartDataType[], currency: string): PriceInfo => {
    const endValue = data[0].value;
    const initialValue = data[data.length - 1].value;
    const diff = endValue - initialValue;
    const perc = initialValue > 0 ? (diff / initialValue) : 0;
    const price = currency === 'ETH' ? endValue * 1000 : endValue;

    return {
        price: price,
        change: diff,
        changePercentage: perc
    }
}

export const getCurrencyInfo = (currency: CurrencyType) => {
    let unit;
    let icon;
    if (currency === 'BTC') {
        unit = 'SATS';
        icon = BTC;
    } else if (currency === 'ETH') {
        unit = 'FINNEYS';
        icon = ETH;
    } else {
        unit = 'USD';
        icon = USD;
    }
    return {unit, icon};
}

export const getLiquidateRatio = (number: ethers.BigNumber) => {
    return 1 / parseFloat(ethers.utils.formatEther(number)) / 100;
}

export const toFloat = (num: string) => {
    const res = parseFloat(num);
    if (isNaN(res)) {
        return 0;
    }
    return res; 
}