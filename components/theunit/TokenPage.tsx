import { getPriceInfo } from "@/app/utils";
import ChartWrapper from "@/components/charts/ChartWrapper";
import CoinLogo from "@/components/CoinLogo";
import PriceChange from "@/components/theunit/PriceChange";
import TokenInfo from "@/components/theunit/TokenInfo";
import { useLocale } from "next-intl";
import { CoinTableData } from "@/app/db/types";


export default function TokenPage({ data } : {data: CoinTableData[]}) {
    const locale = useLocale();
    const coin = data[0];
    const coinId = coin.coin_id;

    const priceData = data.map((d) => {
        return {
            value: d.price,
            time: ''
        }
    });

    const { price, change, changePercentage } = getPriceInfo(priceData, '');

    return <>
        <div className="flex items-center text-2xl gap-2">
            <CoinLogo coinId={coinId} />
            {coin.name}
        </div>
        <div className="text-4xl my-2 text-primary">
            Ø {price.toFixed(3)}
        </div>
        <PriceChange priceChange={changePercentage} diff={change} />
        <div className="mb-8"></div>
        <ChartWrapper locale={locale} symbol={coin.symbol.toUpperCase() + 'UNIT'} />

        <TokenInfo coin={coin} />
    </>
}