import { getCoinLatestData } from "@/utils/db/getCoinLatestData";
import clientPromise from "@/utils/db/mongodb";
import TokenPage from "@/components/theunit/TokenPage";

async function getData(id: string) {
    const client = await clientPromise;
    const db = client.db();
    const result = await getCoinLatestData(db, id);
  
    return result;
}

export default async function CoinPage({
    params,
} : {
    params: { id: string }
}) {
    const data = await getData(params.id);
    
    return <TokenPage data={data} />
}