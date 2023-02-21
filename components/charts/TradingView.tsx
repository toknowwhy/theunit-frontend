import * as React from 'react';
import { widget, ChartingLibraryWidgetOptions, IChartingLibraryWidget, ResolutionString, LanguageCode } from '@/public/charting_library';
import { UnitDatafeed } from './datafeed';

export class TVChartContainer extends React.PureComponent {
	static defaultProps: { symbol: string, locale: string } = {
		symbol: 'UNITSATOSHI',
		locale: 'en',
	};

	tvWidget: IChartingLibraryWidget | null = null;
	ref: React.LegacyRef<HTMLDivElement> | null = null;

	constructor(props: { symbol: string, locale: string }) {
		super(props);

		this.ref = React.createRef<HTMLDivElement>();
	}

	componentDidMount() {

		const containerRef = this.ref as React.LegacyRef<HTMLDivElement>;

		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: (this.props as { symbol: string, locale: string }).symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new UnitDatafeed(),
			interval: 'D' as ResolutionString,
			container: containerRef!.current,
			library_path: '/charting_library/',
			theme: 'Dark',
			locale: (this.props as { symbol: string, locale: string }).locale as LanguageCode,
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: 'https://saveload.tradingview.com',
			charts_storage_api_version: '1.1',
			client_id: 'tradingview.com',
			user_id: 'public_user_id',
			fullscreen: false,
			autosize: true,
			studies_overrides: {},
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (	
			<div className="h-[660px]" ref={(element) => {
				(this.ref as React.LegacyRef<HTMLDivElement>).current = element;
			  }} />
		);
	}
}
