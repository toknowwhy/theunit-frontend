'use client';

import TVChartContainer from "./TradingView";

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