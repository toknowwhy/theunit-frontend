import { Suspense } from "react";
import TokenPage, { preloadToken } from "@/components/theunit/TokenPage";
import Loading from "../../loading";


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