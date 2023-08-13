import { useLocale } from "next-intl";
import dynamic from 'next/dynamic';
const TVChartContainer = dynamic(() => import('./TradingView'), { ssr: false })

export default function ChartWrapper({
    symbol,
} : {
    symbol: string,
}) {
    const locale = useLocale();
    const loc = locale === 'cn' ? 'zh' : locale;
    return <TVChartContainer locale={loc} symbol={symbol} />
}