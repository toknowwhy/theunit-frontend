import UnitTable from '@/components/theunit/UnitTable';
import getUnitData from "@/app/db/getUnitData";
import clientPromise from "@/app/db/mongodb";

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const result = getUnitData(db, true);
  
    return result;
  }

export default async function Home() {
  const data = await getData();
  return <>
    <UnitTable 
      titleKey='candidates'
      subtitleKey='candidates-notes'
      data={data}
    />
  </>;
}