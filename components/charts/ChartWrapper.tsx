import { useLocale } from "next-intl";
import TVChartContainer from "./TradingView";

export default function ChartWrapper({
    symbol,
} : {
    symbol: string,
}) {
    const locale = useLocale();
    const loc = locale === 'cn' ? 'zh' : locale;
    return <TVChartContainer locale={loc} symbol={symbol} />
}