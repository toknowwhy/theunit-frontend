import { CoinTableData } from "@/utils/types";
import { renderPrice, renderBigNumber } from "@/utils/functions";
import CoinLogo from "../CoinLogo";
import PriceChange from "./PriceChange";
import { Link } from "next-intl";
import BoxContainer from "../BoxContainer";
import { ReactNode } from "react";

export default function Table({ 
    data, 
    headers,
    isCandidate,
 } : { 
    data: CoinTableData[], 
    headers: string[],
    isCandidate: boolean 
}) {

    return <BoxContainer>
        <div className="grid grid-cols-[90px_minmax(240px,_2fr)_repeat(4,minmax(120px,_1fr))] items-center font-semibold overflow-x-scroll px-4 py-8">
            <div className="contents text-gray font-normal">
                {headers.map((h) => <div className="first:pl-6 h-16 leading-[4rem]" key={h}>
                    {h}
                </div>)}
            </div>
            {data.map((d) => (
                <Link href={`${isCandidate ? '/candidates' : ''}/coins/${d.coin_id}`} className="group contents hover:bg-gray-border leading-[4rem]" key={d.coin_id}>
                    <TableItem className="pl-6 rounded-l-lg">{d.rank}</TableItem>
                    <TableItem className="flex gap-4 items-center">
                        <CoinLogo coinId={d.coin_id} /> {d.name}
                    </TableItem>
                    <TableItem>{renderPrice(d.price)}</TableItem>
                    <TableItem><PriceChange priceChange={d.price_change_percentage_24h} /></TableItem>
                    <TableItem>{renderBigNumber(d.market_cap)}</TableItem>
                    <TableItem className="ounded-r-lg">{renderBigNumber(d.volume)}</TableItem>
                </Link>
            ))}
        </div>
    </BoxContainer>
}

function TableItem({ 
    className,
    children 
} : { 
    className?: string,
    children: ReactNode 
}) {
    return (
        <div className={"group-hover:bg-input dark:group-hover:bg-gray-border h-16 " + (className ?? "")}>
            {children}
        </div>
    )
}