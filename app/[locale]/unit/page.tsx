import { getUnitDailyData } from "@/app/db/getUnitDailyData";
import clientPromise from "@/app/db/mongodb";
import { ThumbChartDataType } from "@/app/types";
import ThumbChart from "@/components/charts/ThumbnailChart";
import moment from "moment";

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const result = await getUnitDailyData(db);
    const res: ThumbChartDataType[] = result.map((r: any) => {
        return {
            value: r.value,
            time: moment(r.time).format('YYYY-MM-DD')
        }
    })
  
    return res;
}

export default async function UnitPage() {
    const data = await getData();
    return <ThumbChart data={data} currency="BTC" price={1234} />
}