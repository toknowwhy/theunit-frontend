'use client';

import React, { useEffect, useRef } from 'react';
import { CurrencyType, ThumbChartDataType } from '@/app/types';
import { ColorType, createChart } from 'lightweight-charts';
import Image from 'next/image';
import BTC from '@/public/btc.svg';
import ETH from '@/public/eth.svg';
import USD from '@/public/usd.svg';
import PriceChange from '../theunit/PriceChange';


export default function ThumbChart({
    data,
    active = false,
    currency,
    price,
} : {
    data: ThumbChartDataType[],
    active?: boolean,
    currency: CurrencyType,
    price: number
}) {

	const chartContainerRef = useRef(null);

    const endValue = data[0].value;
    const initialValue = data[data.length - 1].value;
    const diff = endValue - initialValue;

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
                topColor: diff < 0 ? 'rgba(253, 68, 56, 0.8)' : 'rgba(21, 255, 171, 0.8)',
                lineColor: diff < 0 ? '#FD4438' : '#15FFAB',
                bottomColor: diff < 0 ? 'rgba(253, 68, 56, 0)' : 'rgba(21, 255, 171, 0)',
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
		[ data ]
	);

    let unit;
    let icon;
    if (currency === 'BTC') {
        unit = 'SATS';
        icon = BTC;
    } else if (currency === 'ETH') {
        unit = 'FINNEYS';
        icon = ETH;
    } else {
        unit = 'USD';
        icon = USD;
    }

    const perc = initialValue > 0 ? (diff / initialValue) : 0;

	return (<div className={"bg-black-light/40 backdrop-blur-sm rounded-2xl" + (active ? " shadow-xl shadow-white/10 border border-gray" : "")}>
        <div className="flex justify-between items-center mb-4">
            <div>
                <div className="text-text-light">The Unit (Ø) In {currency}</div>
                <div className="text-2xl font-semibold">Ø1=6146.23 {unit}</div>
            </div>
            <Image src={icon} alt={currency} />
        </div>
		<div className="flex justify-between items-end">
            <div className="w-56" ref={chartContainerRef}></div>
            <PriceChange className="font-2xl font-semibold" priceChange={perc} />
        </div>
    </div>);
};