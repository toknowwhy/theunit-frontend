import { Socket } from 'socket.io-client';
import { parseFullSymbol, SymbolInfo } from './helpers';
import { io } from 'socket.io-client';

const socket: Socket = io('wss://streamer.cryptocompare.com/v2');
const channelToSubscription: Map<string, SubscriptionItem> = new Map();

export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Handler {
  id: string;
  callback: (bar: Bar) => void;
}

interface SubscriptionItem {
  subscriberUID: string;
  resolution: string;
  lastDailyBar: Bar;
  handlers: Handler[];
}

socket.on('connect', () => {
  console.log('[socket] Connected');
});

socket.on('disconnect', (reason: string) => {
  console.log('[socket] Disconnected:', reason);
});

socket.on('error', (error: Error) => {
  console.log('[socket] Error:', error);
});

socket.on('m', (data: string) => {
  console.log('[socket] Message:', data);
  const [
    eventTypeStr,
    exchange,
    fromSymbol,
    toSymbol,
    ,
    ,
    tradeTimeStr,
    ,
    tradePriceStr,
  ] = data.split('~');

  if (parseInt(eventTypeStr) !== 0) {
    return;
  }
  const tradePrice: number = parseFloat(tradePriceStr);
  const tradeTime: number = parseInt(tradeTimeStr);
  const channelString: string = `0~${exchange}~${fromSymbol}~${toSymbol}`;
  const subscriptionItem: SubscriptionItem | undefined = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar: Bar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime: number = getNextDailyBarTime(lastDailyBar.time);

  let bar: Bar;
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    };
  }
  subscriptionItem.lastDailyBar = bar;
  subscriptionItem.handlers.forEach(handler => handler.callback(bar));
});

function getNextDailyBarTime(barTime: number): number {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
}

export function subscribeOnStream(
  symbolInfo: SymbolInfo,
  resolution: string,
  onRealtimeCallback: (bar: Bar) => void,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar: Bar,
): void {
  const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
  const channelString = `0~${parsedSymbol?.exchange}~${parsedSymbol?.fromSymbol}~${parsedSymbol?.toSymbol}`;
  const handler: Handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem: SubscriptionItem | undefined = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  socket.emit('SubAdd', { subs: ['0~Coinbase~BTC~USD'] });
}

export function unsubscribeFromStream(subscriberUID: string): void {
  const keys = Object.keys(channelToSubscription);
  for (const channelString of keys) {
    const subscriptionItem: SubscriptionItem | undefined = channelToSubscription.get(channelString);
    if (!subscriptionItem) continue;

    const handlerIndex = subscriptionItem.handlers.findIndex(handler => handler.id === subscriberUID);
    if (handlerIndex !== -1) {
      subscriptionItem.handlers.splice(handlerIndex, 1);
      if (subscriptionItem.handlers.length === 0) {
        socket.emit('SubRemove', { subs: [channelString] });
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
