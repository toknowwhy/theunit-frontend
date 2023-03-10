import { CoinTableData } from "@/utils/db/types";
import { renderPrice, renderBigNumber } from "@/utils/functions";
import CoinLogo from "../CoinLogo";
import PriceChange from "./PriceChange";
import { Link } from "next-intl";

export default function Table({ 
    data, 
    headers,
    isCandidate,
 } : { 
    data: CoinTableData[], 
    headers: string[],
    isCandidate: boolean 
}) {

    return <div className="grid grid-cols-[90px_minmax(240px,_2fr)_repeat(4,minmax(120px,_1fr))] items-center bg-gray-darker p-4 rounded-lg shadow-2xl font-semibold overflow-x-scroll">
        <div className="contents text-gray font-normal">
            {headers.map((h) => <div className="first:pl-6 h-16 leading-[4rem]" key={h}>
                {h}
            </div>)}
        </div>
        {data.map((d) => (
            <Link href={`${isCandidate ? '/candidates' : ''}/coins/${d.coin_id}`} className="group contents hover:bg-gray-dark leading-[4rem]" key={d.coin_id}>
                <div className="group-hover:bg-gray-dark h-16 pl-6 rounded-l-lg">{d.rank}</div>
                <div className="group-hover:bg-gray-dark h-16 flex gap-4 items-center">
                    <CoinLogo coinId={d.coin_id} /> {d.name}
                </div>
                <div className="group-hover:bg-gray-dark h-16">{renderPrice(d.price)}</div>
                <PriceChange className="group-hover:bg-gray-dark h-16" priceChange={d.price_change_percentage_24h} />
                <div className="group-hover:bg-gray-dark h-16">{renderBigNumber(d.market_cap)}</div>
                <div className="group-hover:bg-gray-dark h-16 rounded-r-lg">{renderBigNumber(d.volume)}</div>
            </Link>
        ))}
    </div>
}