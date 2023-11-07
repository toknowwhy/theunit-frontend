import { SiteLocale } from "./types";

export const currentWorldPopulation = 7673533972;
export const averageLifeExpectancyInYears = 72.584;

export const RECOMMENDED_COLLATERAL_RATIO = 0.2;
export const FARM_VAULT_RATIO = 0.6;
export const FARM_VAULT_COLLATERAL_RATIO = 2/3;
export const FARM_POOL_TINU_RATIO = 0.3;
export const FARM_POOL_UN_RATIO = 0.1;
export const SITE_URL = 'https://app.unitindex.org';
export const SITE_TITLE = 'TINU, UNIT\'s ETF DeFi vaults and farms';
export const SITE_DESCRIPTION = 'To engage with UNIT, we created a flatcoin peg named TINU. With TINU you can trade Bitcoin dominance through the BTC/TINU pair. Even inexperienced investors can hold TINU to get exposure to the most important part of the cryptocurrency market without needing to research individual coins. With TINU you can maintain purchasing power, fighting against perpetual inflation.';
export const AVAILABLE_LOCALES: SiteLocale[] = [
    {
        locale: 'en',
        title: 'English'
    },
    {
        locale: 'es',
        title: 'Español'
    },
    {
        locale: 'cn',
        title: '中文'
    },
]