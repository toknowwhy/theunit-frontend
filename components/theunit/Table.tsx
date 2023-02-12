'use client';

import { CoinTableData } from "@/app/db/types";
import Image from "next/image";
import redArrow from '@/public/red-arrow.svg';
import greenArrow from '@/public/green-arrow.svg';
import { numberWithCommas } from "@/helpers/numberWithCommas";
import styles from './Table.module.scss';
import RowWrapper from "./RowWrapper";
import CoinLogo from "../CoinLogo";

export default function Table({ data, headers } : { data: CoinTableData[], headers: string[] }) {

    const renderPrice = (price: number) => 'Ø' + (price < 0.001 ? price.toFixed(6) : price.toFixed(3));
    const renderPriceChange = (priceChange: number) => {
        const cname = priceChange < 0 ? styles.dropped : styles.increased;
        const imgSrc = priceChange < 0 ? redArrow : greenArrow;
        const perc = priceChange.toFixed(3).replace('-', '') + '%';
        return <div className={cname}>
            <Image src={imgSrc} alt={cname} /> {perc}
        </div>
    }
    const renderBigNumber = (num: number) => numberWithCommas((num / 1000000).toFixed(0))
    

    return <div className={styles.table}>
        <div className={styles.headerRow}>
            {headers.map((h) => <div key={h}>
                {h}
            </div>)}
        </div>
        {data.map((d) => (
            <RowWrapper coinId={d.coin_id} className={styles.bodyRow} key={d.coin_id}>
                <div>{d.rank}</div>
                <div className={styles.name}>
                    <CoinLogo coinId={d.coin_id} /> {d.name}
                </div>
                <div>{renderPrice(d.price)}</div>
                {renderPriceChange(d.price_change_percentage_24h)}
                <div>{renderBigNumber(d.market_cap)}</div>
                <div>{renderBigNumber(d.volume)}</div>
            </RowWrapper>
        ))}
    </div>
}