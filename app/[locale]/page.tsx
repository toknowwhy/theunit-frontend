import BodyContainer from '@/components/navbar/BodyContainer';
import UnitTable from '@/components/theunit/UnitTable';
import getUnitData from "@/utils/db/getUnitData";
import clientPromise from "@/utils/db/mongodb";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UNIT Index Currencies',
  description: 'Currencies that are in the UNIT Index'
}

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const result = await getUnitData(db);
  
    return result;
}

export default async function Home() {
  const data = await getData();
  return (
    <BodyContainer>
      <UnitTable 
          titleKey='indexed-currencies'
          subtitleKey='indexed-currencies-notes'
          data={data}
      />
    </BodyContainer>
  );
}
