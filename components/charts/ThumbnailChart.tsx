'use client';

import { ThumbChartDataType } from '@/app/types';
import { ColorType, createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export default function ThumbChart({
    data,
} : {
    data: ThumbChartDataType[],
}) {

	const chartContainerRef = useRef(null);

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
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

            const endValue = data[0].value;
            const initialValue = data[data.length - 1].value;
            const diff = endValue - initialValue;

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
		[data]
	);

	return (
		<div ref={chartContainerRef}></div>
	);
};