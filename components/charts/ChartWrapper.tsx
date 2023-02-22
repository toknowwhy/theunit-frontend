'use client';

import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(() => import('./TradingView'), { ssr: false })

export default function ChartWrapper({
    locale,
    symbol,
} : {
    locale: string,
    symbol: string,
}) {
    return <TVChartContainer locale={locale} symbol={symbol} />
}