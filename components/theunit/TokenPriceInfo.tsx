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
        <div className="text-2xl text-white mb-2">UNIT (Ø) In {currency}</div>
        <div className="text-4xl text-gradient font-bold mb-2">Ø1 = {price.toFixed(3)} <span className="text-xl">{unit}</span></div>
        <PriceChange priceChange={changePercentage} diff={change} />
    </div>
}