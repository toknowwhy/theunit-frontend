import { getETHHourlyData, getUnitHourlyData } from "@/app/db/getUnitDailyData";
import clientPromise from "@/app/db/mongodb";
import { CurrencyType } from "@/app/types";
import ThumbCharts from "@/components/charts/ThumbCharts";
import bgd from '@/public/thumbs-bgd.svg';
import Image from "next/image";

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const btc = await getUnitHourlyData(db);
    const eth = await getETHHourlyData(db);
    const usd = await getUnitHourlyData(db, true);
  
    return {btc, eth, usd};
}

export default async function UnitPage({
    params
} : {
    params: { currency: CurrencyType }
}) {
    const currency = params.currency;
    const data = await getData();
    return <div className="relative">
        <Image 
            src={bgd} 
            alt="bgd" 
            className="absolute w-full top-[-6rem]"
        />
        <ThumbCharts
                currency={currency} 
                btcData={data.btc} 
                ethData={data.eth} 
                usdData={data.usd} 
            />
    </div>
}