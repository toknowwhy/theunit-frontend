'use client'

import { useEffect, useRef } from "react";
import { 
	widget, 
	ResolutionString,
    ThemeName, 
} from '@/public/charting_library';
import { UDFCompatibleDatafeed } from "@/public/charting_library/datafeeds/udf/src/udf-compatible-datafeed";
import { useTheme } from "next-themes";

export default function ExampleChart() {

    const ref = useRef<HTMLDivElement|null>(null);
    const symbol = 'DOGE:BTC';
    const { theme } = useTheme();
    
    useEffect(() => {

		let tvWidget = new widget({
            symbol,             // Default symbol
            interval: '1D' as ResolutionString,    
            locale: 'en',                     // Default interval
            fullscreen: false,  
            debug: true,
            height: 600,
            autosize: true,
            container: ref!.current!,
            datafeed: new UDFCompatibleDatafeed('/api/udf'),
            library_path: '/charting_library/',
            theme: (theme === 'dark' ? 'Dark' : 'Light') as ThemeName,
            overrides: {
                "mainSeriesProperties.minTick": symbol.toLowerCase().indexOf('shib') > -1 ? "1000000000,1,false" : "1000,1,false"
            },
            studies_overrides: {
                "volume.volume.color.0": "#6495ED",
                "volume.volume.color.1": "#FF8243",
            },
            custom_css_url: '/charting_library/custom.css',
        })

        tvWidget.onChartReady(() => {
			tvWidget?.chart().getSeries().setChartStyleProperties(1, {
				"upColor": "#FF8243",
				"downColor": "#6495ED",
				"drawWick": true,
				"drawBorder": true,
				"borderColor": "#378658",
				"borderUpColor": "#FF8243",
				"borderDownColor": "#6495ED",
				"wickColor": "#B5B5B8",
				"wickUpColor": "#FF8243",
				"wickDownColor": "#6495ED",
				"barColorsOnPrevClose": false,
				"drawBody": true
			})
			tvWidget!.headerReady().then(() => {
				const button = tvWidget!.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget!.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});

		return () => {
			if (tvWidget != null) {
				tvWidget.remove();
			}
		}

	}, [theme])

    return (
        <div className='h-[760px] p-4' ref={ref}></div>
    )
}