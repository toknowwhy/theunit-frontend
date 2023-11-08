import { getCoinsInfo } from './helpers';

export async function getCoinInfo(db, coinId) {
    const coinsInfo = await getCoinsInfo(db, coinId);
    return coinsInfo;
}