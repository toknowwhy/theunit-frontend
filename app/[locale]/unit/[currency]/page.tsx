import { getETHHourlyData, getUnitHourlyData } from "@/utils/db/getUnitDailyData";
import clientPromise from "@/utils/db/mongodb";
import { ChartSymbolType, instanceOfCurrencyType } from "@/utils/types";
import ChartWrapper from "@/components/charts/ChartWrapper";
import ThumbCharts from "@/components/charts/ThumbCharts";
import TokenPriceInfo from "@/components/theunit/TokenPriceInfo";
import bgd from '@/public/thumbs-bgd.svg';
import { useLocale } from "next-intl";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData()  {
    const client = await clientPromise;
    const db = client.db();
    const btc = await getUnitHourlyData(db);
    const eth = await getETHHourlyData(db);
    const usd = await getUnitHourlyData(db, true);
  
    return {
        BTC: btc,
        ETH: eth,
        USD: usd,
    };
}

export default async function UnitPage({
    params
} : {
    params: { currency: string }
}) {
    const locale = useLocale();

    const currency = params.currency.toUpperCase();
    if (!instanceOfCurrencyType(currency)) {
        return notFound();
    }

    const data = await getData();

    const symbol: ChartSymbolType = currency === 'BTC' ? 'UNITSATOSHI' : 
        ( currency === 'ETH' ? 'UNITFINNEY' : 'UNITUSD')

    return <>
        <div className="relative mb-24">
            <Image 
                src={bgd} 
                alt="bgd" 
                className="absolute w-full top-[-6rem]"
            />
            <ThumbCharts
                    currency={currency} 
                    btcData={data.BTC} 
                    ethData={data.ETH} 
                    usdData={data.USD} 
                />
        </div>
        <div className="flex justify-between items-end mb-8">
            <TokenPriceInfo data={data[currency]} currency={currency} />
            <div className="pr-4 text-sm">Tweet this chart 👇🏼</div>
        </div>
        <ChartWrapper locale={locale} symbol={symbol} />
    </>
}