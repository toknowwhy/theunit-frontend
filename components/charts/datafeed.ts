import {
  DatafeedConfiguration,
  IDatafeedChartApi,
  LibrarySymbolInfo,
  ErrorCallback,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SearchSymbolResultItem,
  SearchSymbolsCallback,
  SymbolResolveExtension,
  HistoryCallback,
  PeriodParams,
  SubscribeBarsCallback,
  Bar,
  HistoryMetadata,
} from '@/public/charting_library/datafeed-api';
import { Dictionary } from 'ts-essentials';

type PeriodParamsWithOptionalCountback = Omit<PeriodParams, 'countBack'> & {
  countBack?: number;
};

interface GetBarsResult {
  bars: Bar[];
  meta: HistoryMetadata;
}

interface DataSubscriber {
  symbolInfo: LibrarySymbolInfo;
  resolution: string;
  lastBarTime: number | null;
  listener: SubscribeBarsCallback;
}

interface DataSubscribers {
  [guid: string]: DataSubscriber;
}

interface QueryParam {
  from: number;
  to: number;
  currency?: string;
  coin_id?: string;
}

export interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
}

interface SymbolItemInfo extends SearchSymbolResultItem {
  coin_id: string;
}

function getErrorMessage(error: string | Error | undefined): string {
  if (error === undefined) {
    return '';
  } else if (typeof error === 'string') {
    return error;
  }

  return error.message;
}

export class UnitDatafeed implements IDatafeedChartApi {
  private readonly _readyPromise: Promise<void>;
  private _symbolsList: SymbolItemInfo[] = [];
  private _fetched: boolean = false;
  private _resolution: ResolutionString = '1D' as ResolutionString;
  private readonly _subscribers: DataSubscribers = {};

  private _getAllSymbols(): Promise<void> {
    this._symbolsList = [
      {
        symbol: 'UNITSATOSHI',
        ticker: 'UNITSATOSHI',
        full_name: 'Unit / Satoshi',
        description: 'Unit / Satoshi',
        exchange: 'Unit',
        type: 'crypto',
        coin_id: 'unitbtc',
      },
      {
        symbol: 'UNITFINNEY',
        ticker: 'UNITFINNEY',
        full_name: 'Unit / Finney',
        description: 'Unit / Finney',
        exchange: 'Unit',
        type: 'crypto',
        coin_id: 'uniteth',
      },
      {
        symbol: 'UNITUSD',
        ticker: 'UNITUSD',
        full_name: 'Unit / USD',
        description: 'Unit / USD',
        exchange: 'Unit',
        type: 'crypto',
        coin_id: 'unitusd',
      },
    ];

    return new Promise(
      (resolve: () => void, reject: (error: Error) => void) => {
        fetch("/api/allSymbols")
        .then((response) => response.json())
          .then((allSymbols) => {
            if (allSymbols) {
              this._symbolsList = this._symbolsList.concat(
                allSymbols.map((item: CoinInfo) => {
                  const upper = item.symbol.toUpperCase();
                  const str = item.name;
                  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
                  return {
                    symbol: `${upper}UNIT`,
                    ticker: `${upper}UNIT`,
                    full_name: `${str2} / Unit`,
                    description: `${str2} / Unit`,
                    exchange: 'UNIT',
                    type: 'crypto',
                    coin_id: item.id,
                  };
                }),
              );
            }

            resolve();
          })
          .catch((reason?: string | Error) => {
            console.log(`Request data for symbols failed, ${reason}`);
            resolve();
          });
      },
    );
  }

  private _init(): Promise<void> {
    return this._getAllSymbols().then(() => {
      this._symbolsList.sort();
    });
  }

  private _searchSymbols(
    searchString: string,
    exchange: string,
    symbolType: string,
    maxSearchResults: number,
  ): Promise<SearchSymbolResultItem[]> {
    return this._readyPromise.then(() => {
      const result = this._symbolsList.filter(
        (item) =>
          (item.full_name + item.symbol)
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) > -1,
      );
      return Promise.resolve(result);
    });
  }

  private _objToQueryString(obj: Dictionary<string|number|undefined>) {
    const keyValuePairs = [];
    for (const key in obj) {
      if (obj[key]) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]!));
      }
    }
    return keyValuePairs.join('&');
  }

  private _getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    from: number,
  ): Promise<GetBarsResult> {
    const to = Math.floor(new Date().getTime() / 1000);
    const arr = symbolInfo.full_name.split(' / ');
    let currency: string | undefined; 
    let coinId: string | undefined;
    if (arr[0] === 'Unit') {
      currency = arr[1] === 'Satoshi' ? 'BTC' : arr[1] === 'Finney' ? 'ETH' : 'USD';
    } else {
      coinId = symbolInfo.unit_id!;
    }

    return new Promise(
      (
        resolve: (result: GetBarsResult) => void,
        reject: (reason: string) => void,
      ) => {
        const data = {from, to, currency, coinId, resolution};
        fetch('/api/allBars?'+this._objToQueryString(data))
          .then((response) => response.json())
          .then((allBars) => {
            if (allBars) {
              const bars = allBars.map((bar: any) => {
                return {
                  time: new Date(bar.time).getTime(),
                  low: bar.low,
                  high: bar.high,
                  open: bar.open,
                  close: bar.close,
                  volume: bar.volume,
                };
              });

              resolve({
                bars: bars,
                meta: { noData: false },
              });
            }
          })
          .catch((reason?: string | Error) => {
            const reasonString = getErrorMessage(reason);
            console.warn(
              `HistoryProvider: getBars() failed, error=${reasonString}`,
            );
            reject(reasonString);
          });
      },
    );
  }

  public constructor() {
    this._readyPromise = this._init();
    this._readyPromise.catch((error: Error) => {
      console.error(`SymbolsStorage: Cannot init, error=${error.toString()}`);
    });
  }

  public onReady(callback: OnReadyCallback): void {
    setTimeout(() => callback(defaultConfiguration()));
  }

  public searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback,
  ): void {
    this._searchSymbols(userInput, exchange, symbolType, 30)
      .then(onResult)
      .catch(onResult.bind(null, []));
  }

  public resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
    extension?: SymbolResolveExtension,
  ): void {
    setTimeout(() => {
      var symbolInfo = this._symbolsList[0];
      this._fetched = false;
      for (var i = 0; i < this._symbolsList.length; i++) {
        const item = this._symbolsList[i];
        if (item.symbol === symbolName) {
          symbolInfo = item;
          break;
        }
      }
      const sym = symbolInfo.symbol;
      onResolve({
        ...symbolInfo,
        name: symbolName,
        session: '24x7',
        exchange: 'UNIT',
        listed_exchange: 'UNIT',
        timezone: 'America/New_York',
        format: 'price',
        has_intraday: true,
        pricescale: sym === 'DOGEUNIT' || sym === 'SHIBUNIT' ? 1000000 : 1000,
        minmov: 1,
        unit_id: symbolInfo.coin_id,
        supported_resolutions: [
          '15' as ResolutionString,
          '1H' as ResolutionString,
          '4H' as ResolutionString,
          '1D' as ResolutionString,
          '1W' as ResolutionString,
          '1M' as ResolutionString,
        ],
      });
    }, 1000);
  }

  public getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParamsWithOptionalCountback,
    onResult: HistoryCallback,
    onError: ErrorCallback,
  ): void {
    if (!this._fetched || resolution !== this._resolution) {
      this._getBars(symbolInfo, resolution, parseInt(resolution) > 1 ? 1688122200 : 1391040000)
        .then((result: GetBarsResult) => {
          this._fetched = true;
          this._resolution = resolution;
          onResult(result.bars, result.meta);
        })
        .catch(onError);
    } else {
      setTimeout(() => {
        onResult([], { noData: false });
      }, 0);
    }
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void,
  ): void {
    if (this._subscribers.hasOwnProperty(listenerGuid)) {
      return;
    }

    this._subscribers[listenerGuid] = {
      lastBarTime: null,
      listener: onTick,
      resolution: resolution,
      symbolInfo: symbolInfo,
    };
  }

  public unsubscribeBars(listenerGuid: string): void {
    delete this._subscribers[listenerGuid];
  }
}

function defaultConfiguration(): DatafeedConfiguration {
  return {
    supported_resolutions: [
      '15' as ResolutionString,
      '1H' as ResolutionString,
      '4H' as ResolutionString,
      '1D' as ResolutionString,
      '1W' as ResolutionString,
      '1M' as ResolutionString,
    ],
    exchanges: [
      {
        value: 'UNIT',
        name: 'UNIT',
        desc: 'UNIT',
      },
      {
        value: 'UNIT',
        name: 'UNIT',
        desc: 'UNIT',
      },
    ],
    symbols_types: [
      {
        name: 'crypto',
        value: 'crypto',
      },
      // ...
    ],
  };
}
