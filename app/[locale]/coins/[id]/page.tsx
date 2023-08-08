import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import TokenPage, { preloadToken } from "@/components/theunit/TokenPage";


export default async function CoinPage({
    params,
} : {
    params: { id: string }
}) {
    preloadToken(params.id);
    
    return <Suspense fallback={<Spinner />}>
            <TokenPage id={params.id} />
        </Suspense>
}