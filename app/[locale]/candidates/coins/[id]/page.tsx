import { Suspense } from "react";
import TokenPage, { preloadToken } from "@/components/theunit/TokenPage";
import Loading from "@/app/[locale]/loading";
import { getCoinInfo } from "@/utils/db/getCoinInfo";
import clientPromise from "@/utils/db/mongodb";
import { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
    {params}: {params: { id: string }},
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id
    const client = await clientPromise;
    const db = client.db();
    const result: any = await getCoinInfo(db, id);
    const info = result[id] ? `${result[id].name} UNIT Chart and Stats` : 'Coin UNIT Chart and Stats';
   
    return {
      title: info,
      description: info
    }
}

export default async function CoinPage({
    params,
} : {
    params: { id: string }
}) {
    preloadToken(params.id);
    
    return <Suspense fallback={<Loading />}>
            <TokenPage id={params.id} />
        </Suspense>
}