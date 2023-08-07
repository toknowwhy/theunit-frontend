import { notFound } from "next/navigation";
import ChartWrapper from "@/components/charts/ChartWrapper";
import CoinLogo from "@/components/CoinLogo";
import PriceChange from "@/components/theunit/PriceChange";
import TokenInfo from "@/components/theunit/TokenInfo";
import { useLocale } from "next-intl";
import BodyContainer from "../navbar/BodyContainer";
import { displayTokenPrice } from "@/utils/functions";
import { getCoinLatestData } from "@/utils/db/getCoinLatestData";
import clientPromise from "@/utils/db/mongodb";

async function getTokenData(id: string) {
    const client = await clientPromise;
    const db = client.db();
    const result = await getCoinLatestData(db, id);
  
    return result;
}

export const preloadToken = (id: string) => {
    void getTokenData(id)
}


export default async function TokenPage({ id }: { id: string }) {

    const locale = useLocale();

    const data = await getTokenData(id)

    if (!data ) {
        return notFound();
    }

    const coinId = data.coin_id;

    return <BodyContainer>
        <div className="flex items-center text-2xl gap-2">
            <CoinLogo coinId={coinId} />
            {data.name}
        </div>
        <div className="inline-block text-4xl my-2 text-gradient">
            Ø {displayTokenPrice(data.price, coinId)}
        </div>
        <PriceChange priceChange={data.price_change_percentage_24h} diff={data.price_change_24h} />
        <div className="mb-8"></div>
        <Suspense fallback={<Spinner />}>
            <ChartWrapper locale={locale} symbol={data.symbol.toUpperCase() + 'UNIT'} />
        </Suspense>

        <TokenInfo coin={data} />
    </BodyContainer>
}