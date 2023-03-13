import { getCurrencyInfo, getPriceInfo } from "@/utils/functions";
import { CurrencyType, ThumbChartDataType } from "@/utils/types";
import PriceChange from "@/components/theunit/PriceChange";

export default function TokenPriceInfo({
    data,
    currency,
} : {
    data: ThumbChartDataType[],
    currency: CurrencyType,
}) {

    const { price, change, changePercentage } = getPriceInfo(data, currency);
    const { unit } = getCurrencyInfo(currency);

    return <div>
        <div className="text-2xl text-primary mb-2">The Unit (Ø) In {currency}</div>
        <div className="text-4xl mb-2">Ø1 = {price.toFixed(3)} {unit}</div>
        <PriceChange priceChange={changePercentage} diff={change} />
    </div>
}