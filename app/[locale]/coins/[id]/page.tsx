import { getCoinHourlyData } from "@/app/db/getCoinHourlyData";
import clientPromise from "@/app/db/mongodb";
import { getPriceInfo } from "@/app/utils";
import ChartWrapper from "@/components/charts/ChartWrapper";
import CoinLogo from "@/components/CoinLogo";
import PriceChange from "@/components/theunit/PriceChange";
import TokenInfo from "@/components/theunit/TokenInfo";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

async function getData(id: string) {
    const client = await clientPromise;
    const db = client.db();
    const result = await getCoinHourlyData(db, id);
  
    return result;
}

export default async function CoinPage({
    params,
} : {
    params: { id: string }
}) {

    const locale = useLocale();

    const coinId = params.id;
    const data = await getData(coinId);
    if (!data || data.length == 0 ) {
        return notFound();
    }

    const { price, change, changePercentage } = getPriceInfo(data, '');
    const coin = data[0];

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