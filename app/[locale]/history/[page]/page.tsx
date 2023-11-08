import { getHistoryCount, getUnitHistories, historyPageSize } from "@/utils/db/getUnitHistory";
import clientPromise from "@/utils/db/mongodb";
import HistoryTable from "@/components/history/HistoryTable";
import moment from "moment";
import { notFound } from "next/navigation";
import BodyContainer from "@/components/navbar/BodyContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'UNIT Index History',
    description: 'History of UNIT Index'
}

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

const calculatePage = (date: string) => {
    const days = moment().diff(moment(date), 'days');
    return Math.floor(days / historyPageSize);
}

export default async function HistoryPage({params} : {params: {page: string}}) {
    const page = params.page;
    let p = parseInt(page);
    let pageDate: string | undefined;

    if (isNaN(p)) {
        return notFound();
    }
    // date as param
    if (page.indexOf('-') == 4) {
        try {
            p = calculatePage(page) + 1;
            pageDate = page
        } catch(e) {
            return notFound()
        }
    } 

    const data = await getData(p);
    const count = await getCount();

    return (
        <BodyContainer>
            <HistoryTable page={p} data={data} count={count} date={pageDate} />
        </BodyContainer>
    )

}