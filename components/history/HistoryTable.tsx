import { HistoryInfo } from "@/app/types";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment } from "react";
import CoinLogo from "../CoinLogo";
import history from "@/public/history.png";

export default function HistoryTable({
    data
} : {
    data: HistoryInfo[]
}) {
    const t = useTranslations('History');
    return <>
        <div className="bg-[url(/bgds/history.png)] text-4xl px-10 leading-[101px] bg-no-repeat bg-[size:100%_101px]">{t('history')}</div>
        <div className="grid grid-cols-[120px_60px_1fr] text-gray gap-x-20 mb-8">
            <div>{t('name')}</div>
            <div>{t('count')}</div>
            <div>{t('coins')}</div>
        </div>
        <div className="grid grid-cols-[120px_60px_1fr] font-semibold gap-x-20 gap-y-8">
            {data.map((history) => {
                const time: string = moment(history.time).format('YYYY-MM-DD');
                return <Fragment key={time}>
                    <div>{time}</div>
                    <div>{history.coins.length}</div>
                    <div className="flex gap-4">
                        {history.coins.map((coin) => <CoinLogo key={coin.id} coinId={coin.id} />)}
                    </div>
                </Fragment>
            })}
        </div>
    </>
}