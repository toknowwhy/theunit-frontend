'use client';

import { ChartSymbolType, CurrencyType } from '@/app/types';
import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(() => import('./TradingView'), { ssr: false })

export default function ChartWrapper({
    locale,
    currency,
} : {
    locale: string,
    currency: CurrencyType,
}) {
    const symbol: ChartSymbolType = currency === 'BTC' ? 'UNITSATOSHI' : 
        ( currency === 'ETH' ? 'UNITFINNEY' : 'UNITUSD')
    return <TVChartContainer locale={locale} symbol={symbol} />
}