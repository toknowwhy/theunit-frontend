'use client';

import dynamic from 'next/dynamic'
const TVChartContainer = dynamic(() => import('@/components/charts/TradingView'))

export default function ChartWrapper({locale} : {locale: string}) {
    return <TVChartContainer symbol="UNITSATOSHI" locale={locale} />
}