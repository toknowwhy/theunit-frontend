import { Suspense } from "react";
import TokenPage, { preloadToken } from "@/components/theunit/TokenPage";
import { Metadata, ResolvingMetadata } from "next";
import Loading from "../../loading";
import clientPromise from "@/utils/db/mongodb";
import { getCoinInfo } from "@/utils/db/getCoinInfo";

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
