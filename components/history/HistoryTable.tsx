import { CoinInfo, HistoryInfo } from "@/app/types";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import CoinLogo from "../CoinLogo";
import HistoryDatePicker from "./DatePicker";
import Pagination from "./Pagination";

export default function HistoryTable({
    data,
    count,
    date,
    page,
} : {
    data: HistoryInfo[],
    count: number,
    date?: string,
    page: number,
}) {
    const t = useTranslations('History');

    let mostCoins: CoinInfo[] = [];
    for (let j=0;j<data.length;j++) {
        const c = data[j].coins;
        if (mostCoins.length < c.length) {
            mostCoins = c;
        }
    }

    return <>
        <div className="bg-[url(/bgds/history.png)] text-4xl px-10 leading-[101px] bg-no-repeat bg-[size:100%_101px] mb-5">{t('history')}</div>
        <HistoryDatePicker date={date} />
        <div className="grid grid-cols-[200px_120px_1fr] my-8">
            <div>
                <div className="pl-6 text-gray mb-4">{t('name')}</div>
                {data.map((history) => {
                    return <div key={history.time} className="px-6 h-16 leading-[64px] border-b border-b-gray-dark">
                        {history.time}
                    </div>
                })}
            </div>
            <div>
                <div className="text-gray mb-4">{t('count')}</div>
                {data.map((history) => {
                    return <div key={history.time} className="h-16 leading-[64px] border-b border-b-gray-dark">
                        {history.coins.length}
                    </div>
                })}
            </div>

            <div className="overflow-x-scroll scrollbar-hide">
                <div className="whitespace-nowrap overflow-visible text-center text-gray mb-4">
                    {mostCoins.map((coin, index) => (
                        <span key={coin.id} className="mr-6 w-8 inline-block">
                            {index+1}
                        </span>
                    ))}
                </div>
                {data.map((history) => {
                    return <div key={history.time} className="h-16 py-4 pr-6 border-b border-b-gray-dark whitespace-nowrap overflow-visible">
                        {history.coins.map((coin) => <div key={coin.id} className="relative mr-6 inline-block">
                            <CoinLogo coinId={coin.id} />
                        </div>)}
                    </div>
                })}
            </div>
        </div>


        <Pagination page={page} path="/history" total={count} />
    </>
}