'use client';

import React, { useEffect, useRef } from 'react';
import { CurrencyType, ThumbChartDataType } from '@/app/types';
import { ColorType, createChart } from 'lightweight-charts';
import Image from 'next/image';
import PriceChange from '../theunit/PriceChange';
import Link from 'next/link';
import { getCurrencyInfo, getPriceInfo } from '@/app/utils';


export default function ThumbChart({
    data,
    active = false,
    currency,
} : {
    data: ThumbChartDataType[],
    active?: boolean,
    currency: CurrencyType,
}) {

	const chartContainerRef = useRef(null);
  const { price, change, changePercentage } = getPriceInfo(data, currency);
  const { unit, icon } = getCurrencyInfo(currency);
  

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current!["clientWidth"] });
			};

			const chart = createChart(chartContainerRef.current!, {
                height: 100,
                timeScale: {
                  visible: false,
                },
                leftPriceScale: {
                  visible: false,
                  scaleMargins: {
                    top: 0,
                  },
                },
                rightPriceScale: {
                  visible: false,
                  scaleMargins: {
                    top: 0,
                  },
                },
          
                crosshair: {
                  horzLine: {
                    visible: false,
                  },
                  vertLine: {
                    visible: false,
                  },
                },
                layout: {
                    background: { type: ColorType.Solid, color: 'transparent' },
                },
                grid: {
                  vertLines: {
                    visible: false,
                  },
                  horzLines: {
                    visible: false,
                  },
                },
              });
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({
                topColor: change < 0 ? 'rgba(253, 68, 56, 0.8)' : 'rgba(21, 255, 171, 0.8)',
                lineColor: change < 0 ? '#FD4438' : '#15FFAB',
                bottomColor: change < 0 ? 'rgba(253, 68, 56, 0)' : 'rgba(21, 255, 171, 0)',
                lineWidth: 2,
                priceLineColor: 'transparent',
              });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[ data, change ]
	);

    

	return (<Link 
                href={`/unit/${currency}`}
                className={"bg-black-light/40 backdrop-blur-sm rounded-2xl p-6" + (active ? " shadow-lg shadow-white/20 border border-gray" : "")}
            >
        <div className="flex justify-between items-center mb-4">
            <div>
                <div className="text-text-light text-base 2xl:text-lg">The Unit (Ø) In {currency}</div>
                <div className="2xl:text-2xl font-semibold">Ø1={price.toFixed(3)} {unit}</div>
            </div>
            <Image src={icon} alt={currency} />
        </div>
		<div className="grid grid-cols-[1fr_88px] items-end">
            <div className="inline-block pointer-events-none" ref={chartContainerRef}></div>
            <PriceChange className="font-2xl font-semibold" priceChange={changePercentage} />
        </div>
    </Link>);
};