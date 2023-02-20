import { HistoryInfo } from "@/app/types";
import moment from "moment";
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
    return <>
        <div className="bg-[url(/bgds/history.png)] text-4xl px-10 leading-[101px] bg-no-repeat bg-[size:100%_101px] mb-5">{t('history')}</div>
        <HistoryDatePicker date={date} />
        <div className="grid grid-cols-[120px_60px_1fr] text-gray gap-x-20 mb-8 mt-10">
            <div>{t('name')}</div>
            <div>{t('count')}</div>
            <div>{t('coins')}</div>
        </div>
        <div className="grid grid-cols-[120px_60px_1fr] font-semibold gap-x-20 gap-y-8 mb-16">
            {data.map((history) => {
                const time: string = moment(history.time).format('YYYY-MM-DD');
                return <Fragment key={time}>
                    <div>{time}</div>
                    <div>{history.coins.length}</div>
                    <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
                        {history.coins.map((coin) => <CoinLogo key={coin.id} coinId={coin.id} />)}
                    </div>
                </Fragment>
            })}
        </div>
        <Pagination page={page} path="/history" total={count} />
    </>
}