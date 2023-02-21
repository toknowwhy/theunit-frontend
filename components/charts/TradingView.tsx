import { memo, useEffect, useRef } from 'react';
import { 
	widget, 
	IChartingLibraryWidget, 
	ResolutionString, 
	LanguageCode, 
	AvailableSaveloadVersions, 
	ThemeName 
} from '@/public/charting_library';
import { UnitDatafeed } from './datafeed';


const TVChartContainer = memo(function TVChartContainer({
	symbol= 'UNITSATOSHI',
	locale= 'en',
} : { 
	symbol?: string, 
	locale?: string 
}) {
	const ref = useRef(null);

	const widgetOptions = {
		symbol: symbol,
		// BEWARE: no trailing slash is expected in feed URL
		datafeed: new UnitDatafeed(),
		interval: 'D' as ResolutionString,
		library_path: '/charting_library/',
		theme: 'Dark' as ThemeName,
		locale: locale as LanguageCode,
		disabled_features: ['use_localstorage_for_settings'],
		enabled_features: ['study_templates'],
		charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: '1.1' as AvailableSaveloadVersions,
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studies_overrides: {},
	};

	useEffect(() => {
		const options = {
			...widgetOptions,
			container: ref!.current!,
		}

		let tvWidget: null | IChartingLibraryWidget = new widget(options);
		tvWidget.onChartReady(() => {
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