'use client'

import { memo, useEffect, useRef } from 'react';
import { 
	widget, 
	IChartingLibraryWidget, 
	ResolutionString, 
	LanguageCode, 
	AvailableSaveloadVersions, 
	ThemeName, 
	ChartingLibraryWidgetOptions
} from '@/public/charting_library';
import { UnitDatafeed } from './datafeed';
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
		symbol: symbol,
		// BEWARE: no trailing slash is expected in feed URL
		datafeed: new UnitDatafeed(),
		interval: 'D' as ResolutionString,
		library_path: '/charting_library/',
		theme: (theme === 'dark' ? 'Dark' : 'Light') as ThemeName,
		locale: locale as LanguageCode,
		disabled_features: ['use_localstorage_for_settings'],
		enabled_features: ['study_templates'],
		charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: '1.1' as AvailableSaveloadVersions,
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		fullscreen: false,
		autosize: true,
		overrides: {
			"paneProperties.background": mainColor,
			"paneProperties.backgroundGradientStartColor": mainColor,
			"paneProperties.backgroundGradientEndColor": mainColor
		},
		studies_overrides: {
			"volume.volume.color.0": "#6495ED",
			"volume.volume.color.1": "#FF8243",
		},
		custom_css_url: '/charting_library/custom.css',
	};

	useEffect(() => {
		const options: ChartingLibraryWidgetOptions = {
			...widgetOptions,
			container: ref!.current!,
		}

		let tvWidget: null | IChartingLibraryWidget = new widget(options);
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

	return <div className="h-[660px]" ref={ref}></div>
})

export default TVChartContainer;