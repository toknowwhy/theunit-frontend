'use client';

import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(() => import('./TradingView'), { ssr: false })

export default function ChartWrapper({locale} : {locale: string}) {
    return <TVChartContainer locale={locale} />
}