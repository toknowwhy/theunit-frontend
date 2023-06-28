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
    const loc = locale === 'cn' ? 'zh' : locale;
    return <TVChartContainer locale={loc} symbol={symbol} />
}