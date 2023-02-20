'use client';

import { memo, useEffect } from 'react';
import type {
    ChartingLibraryWidgetOptions,
    LanguageCode,
    IChartingLibraryWidget,
    ResolutionString,
} from '@/charting_library';
import { widget } from '@/charting_library';
import { UnitDatafeed } from './datafeed';

export interface ChartContainerProps {
    symbol?: ChartingLibraryWidgetOptions['symbol'];
    interval?: ChartingLibraryWidgetOptions['interval'];
    libraryPath?: ChartingLibraryWidgetOptions['library_path'];
    chartsStorageUrl?: ChartingLibraryWidgetOptions['charts_storage_url'];
    chartsStorageApiVersion?: ChartingLibraryWidgetOptions['charts_storage_api_version'];
    clientId?: ChartingLibraryWidgetOptions['client_id'];
    userId?: ChartingLibraryWidgetOptions['user_id'];
    fullscreen?: ChartingLibraryWidgetOptions['fullscreen'];
    autosize?: ChartingLibraryWidgetOptions['autosize'];
    studiesOverrides?: ChartingLibraryWidgetOptions['studies_overrides'];
    containerId?: ChartingLibraryWidgetOptions['container_id'];
    small?: boolean;
    changeSymbol?: () => void;
    locale: string;
}

const TVChartContainer = memo(function TVChartContainer({
    symbol = 'UNITSATOSHI',
    interval = '1D' as ResolutionString,
    containerId = 'tv_chart_container',
    libraryPath = '/charting_library/',
    chartsStorageUrl = 'https://saveload.tradingview.com',
    chartsStorageApiVersion = '1.1',
    clientId = 'tradingview.com',
    userId = 'public_user_id',
    fullscreen = false,
    autosize = true,
    studiesOverrides = {},
    small = false,
    changeSymbol = () => {},
    locale = 'en',
} : ChartContainerProps) {

    let tvWidget: IChartingLibraryWidget | null;
    
    useEffect(() => {
        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol,
            datafeed: new UnitDatafeed(),
            interval,
            container: containerId,
            library_path: libraryPath,
            theme: 'Dark',
            locale: locale as LanguageCode,
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: chartsStorageUrl,
            charts_storage_api_version: chartsStorageApiVersion,
            client_id: clientId,
            user_id: userId,
            fullscreen: fullscreen,
            autosize: autosize,
            studies_overrides: studiesOverrides,
          };
      
          const tw = new widget(widgetOptions);
          tvWidget = tw;
      
          tvWidget.onChartReady(() => {
            tvWidget!.headerReady().then(() => {
              const button = tvWidget!.createButton();
              button.setAttribute('title', 'Click to show a notification popup');
              button.classList.add('apply-common-tooltip');
              button.addEventListener('click', () =>
                tvWidget!.showNoticeDialog({
                  title: 'Notification',
                  body: 'TradingView Charting Library API works correctly',
                  callback: () => {
                    console.log('Noticed!');
                  },
                }),
              );
              button.innerHTML = 'Check API';
            });
          });

          return () => {
            if (tvWidget !== null) {
                tvWidget.remove();
                tvWidget = null;
            }
          }
    })

    return <div
                id={containerId}
            />
});

export default TVChartContainer;