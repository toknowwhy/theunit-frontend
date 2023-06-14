import { getCoinHourlyData } from "@/utils/db/getCoinHourlyData";
import clientPromise from "@/utils/db/mongodb";
import TokenPage from "@/components/theunit/TokenPage";
import { notFound } from "next/navigation";
import BodyContainer from "@/components/navbar/BodyContainer";

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
    const data = await getData(params.id);
    if (!data || data.length == 0 ) {
        return notFound();
    }

    return (
        <BodyContainer>
            <TokenPage data={data} />
        </BodyContainer>
    )
}