import UnitTable from '@/components/theunit/UnitTable';
import getUnitData from "@/utils/db/getUnitData";
import clientPromise from "@/utils/db/mongodb";

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const result = await getUnitData(db);
  
    return result;
}

export default async function Home() {
  const data = await getData();
  return <UnitTable 
            titleKey='indexed-currencies'
            subtitleKey='indexed-currencies-notes'
            data={data}
          />;
}
