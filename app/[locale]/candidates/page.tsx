import BodyContainer from '@/components/navbar/BodyContainer';
import UnitTable from '@/components/theunit/UnitTable';
import getUnitData from "@/utils/db/getUnitData";
import clientPromise from "@/utils/db/mongodb";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UNIT Index Candidates',
  description: 'Currencies with the potential to enter the UNIT'
}

async function getData() {
    const client = await clientPromise;
    const db = client.db();
    const result = getUnitData(db, true);
  
    return result;
  }

export default async function Home() {
  const data = await getData();
  return (
    <BodyContainer>
      <UnitTable 
        titleKey='candidates'
        subtitleKey='candidates-notes'
        data={data}
        isCandidate={true}
      />
    </BodyContainer>
  );
}