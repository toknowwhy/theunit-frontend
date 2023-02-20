import { CurrencyType, ThumbChartDataType } from "@/app/types";
import ThumbChart from "./ThumbnailChart";

export default function ThumbCharts({
    currency,
    btcData,
    ethData,
    usdData,
} : {
    currency: CurrencyType,
    btcData: ThumbChartDataType[],
    ethData: ThumbChartDataType[],
    usdData: ThumbChartDataType[],
}) {
    return <div className="grid grid-cols-3 gap-10">
        <ThumbChart data={btcData} currency="BTC" active={currency === 'BTC'} />
        <ThumbChart data={ethData} currency="ETH" active={currency === 'ETH'} />
        <ThumbChart data={usdData} currency="USD" active={currency === 'USD'} />
    </div>
}