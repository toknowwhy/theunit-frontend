'use client'

import { memo, useEffect, useRef } from 'react';
import { 
	widget, 
	ResolutionString,
  ThemeName,
	LanguageCode,
	IChartingLibraryWidget, 
} from '@/public/charting_library';
import { UDFCompatibleDatafeed } from "@/public/datafeeds/udf/src/udf-compatible-datafeed";
import { useTheme } from 'next-themes';


const TVChartContainer = memo(function TVChartContainer({
	symbol= 'UNITSATOSHI',
	locale= 'en',
} : { 
	symbol?: string, 
	locale?: string 
}) {
	const ref = useRef(null);
	const { theme } = useTheme();

	const mainColor = theme === 'dark' ? '#151718' : '#f5f5f5';

	const widgetOptions = {
		symbol,
		// BEWARE: no trailing slash is expected in feed URL
		datafeed: new UDFCompatibleDatafeed('/api/udf', 30000),
		interval: 'D' as ResolutionString,
		library_path: '/charting_library/',
		theme: (theme === 'dark' ? 'Dark' : 'Light') as ThemeName,
		locale: locale as LanguageCode,
		charts_storage_url: 'https://saveload.tradingview.com',
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		fullscreen: false,
		autosize: true,
		overrides: {
			"paneProperties.background": mainColor,
			"paneProperties.backgroundGradientStartColor": mainColor,
			"paneProperties.backgroundGradientEndColor": mainColor,
			"mainSeriesProperties.minTick": symbol.toLowerCase().indexOf('shib') > -1 ? "1000000000,1,false" : "1000,1,false"
		},
		studies_overrides: {
			"volume.volume.color.0": "#6495ED",
			"volume.volume.color.1": "#FF8243",
		},
		custom_css_url: '/charting_library/custom.css',
	};

	useEffect(() => {
		let tvWidget: null | IChartingLibraryWidget = new widget({
			...widgetOptions,
			container: ref!.current!
		});
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
				tvWidget = null;
			}
		}

	})

	return <div className="h-[760px]" ref={ref}></div>
})

export default TVChartContainer;