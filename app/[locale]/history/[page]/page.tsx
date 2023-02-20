import { getHistoryCount, getUnitHistories } from "@/app/db/getUnitHistory";
import clientPromise from "@/app/db/mongodb";
import HistoryTable from "@/components/history/HistoryTable";

async function getData(page: number) {
    const client = await clientPromise;
    const db = client.db();
    const histories = await getUnitHistories(db, page);
  
    return histories;
}

async function getCount() {
    const client = await clientPromise;
    const db = client.db();
    const count = await getHistoryCount(db);
  
    return count;
}

export default async function HistoryPage({params} : {params: {page: number}}) {
    const page = params.page;
    const data = await getData(page);
    const count = await getCount();

    return <HistoryTable data={data} />

}