import { CoinInfo, HistoryInfo } from "@/utils/types";
import { useTranslations } from "next-intl";
import CoinLogo from "../CoinLogo";
import HistoryDatePicker from "./DatePicker";
import Pagination from "./Pagination";
import Image from "next/image";
import HistoryLogo from "@/public/history-logo.svg";
import BoxContainer from "../BoxContainer";

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
        <div className="mb-5 flex items-end justify-between">
            <div className="text-4xl font-bold pb-6">{t('history')}</div>
            <HistoryDatePicker date={date} />
        </div>
        <BoxContainer>
            <div className="grid grid-cols-[120px_60px_1fr] md:grid-cols-[200px_120px_1fr] py-8 px-10">
                <div>
                    <div className="px-2 md:pl-6 text-gray mb-4">{t('name')}</div>
                    {data.map((history) => {
                        return <div key={history.time} className="px-2 md:px-6 h-16 leading-[64px] border-b border-b-gray-border">
                            {history.time}
                        </div>
                    })}
                </div>
                <div>
                    <div className="text-gray mb-4">{t('count')}</div>
                    {data.map((history) => {
                        return <div key={history.time} className="h-16 leading-[64px] border-b border-b-gray-border">
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
                        return <div key={history.time} className="h-16 py-4 pr-6 border-b border-b-gray-border whitespace-nowrap overflow-visible">
                            {history.coins.map((coin) => <div key={coin.id} className="relative mr-6 inline-block group">
                                <CoinLogo coinId={coin.id} />
                                <div className="hidden absolute group-hover:block">
                                    {coin.name}
                                </div>
                            </div>)}
                        </div>
                    })}
                </div>
            </div>
        </BoxContainer>


        <div className="mt-8">
            <Pagination page={page} path="/history" total={count} />
        </div>
    </>
}