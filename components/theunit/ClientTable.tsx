'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CoinData, CoinTableData } from '@/app/db/types';
import Image from "next/image";
import redArrow from '@/public/red-arrow.svg';
import greenArrow from '@/public/green-arrow.svg';
import { numberWithCommas } from "@/helpers/numberWithCommas";
import './Table.scss';

export default function ClientTable({ data }: { data: CoinData[] }) {
    const dataSource: CoinTableData[] = data.map((d, index) => {
        return { ...d, key: d.coin_id, rank: (index+1) };
    });

      const columns: ColumnsType<CoinTableData> = [
        {
          title: 'Rank',
          key: 'rank',
          dataIndex: 'rank',
          width: 44,
        },
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            width: 48,
            render: (text: string) => {
              return <Image src={text} alt="logo" width={32} height={32} />
            },
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          align: 'right',
          render: (text: number) =>
            'Ø' + (text < 0.001 ? text.toFixed(6) : text.toFixed(3)),
        },
        {
          title: '24H',
          width: 180,
          dataIndex: 'price_change_percentage_24h',
          key: 'change',
          align: 'right',
          render: (text: number) => (
            <span className={text < 0 ? 'dropped' : 'increased'}>
              <Image src={text < 0 ? redArrow : greenArrow} alt="arrow" />{' '}
              {text.toFixed(3).replace('-', '') + '%'}
            </span>
          ),
        },
        {
          title: 'Market Cap*',
          dataIndex: 'market_cap',
          key: 'marketcap',
          align: 'right',
          render: (text: string) =>
            numberWithCommas((parseFloat(text) / 1000000).toFixed(0)),
        },
        {
          title: '24H Volume*',
          width: 168,
          dataIndex: 'volume',
          align: 'right',
          key: 'volum',
          render: (text: string) =>
            numberWithCommas((parseFloat(text) / 1000000).toFixed(0)),
        },
      ];



    return <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 100 }} />;;
}