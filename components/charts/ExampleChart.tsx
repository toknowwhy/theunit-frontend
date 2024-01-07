'use client'

import { useEffect, useRef } from "react";
import { 
	widget, 
	ResolutionString, 
} from '@/public/charting_library';
import { io } from "socket.io-client";
import DFeed from './dfeed';

export default function ExampleChart() {

    const ref = useRef<HTMLDivElement|null>(null);
    
    useEffect(() => {
        
        const socket = io("http://localhost:3000");
        socket.on('data', (data) => {
            console.log('AAA', data)
        })

		let tvWidget = new widget({
            symbol: 'Bitfinex:BTC/USD',             // Default symbol
            interval: '1D' as ResolutionString,    
            locale: 'en',                     // Default interval
            fullscreen: true,                       // Displays the chart in the fullscreen mode
            container: ref!.current!,
            datafeed: DFeed,
            library_path: '/charting_library/',
        })

		return () => {
			if (tvWidget != null) {
				tvWidget.remove();
			}
            socket.disconnect();
		}

	}, [])

    return (
        <div className="h-[660px]" ref={ref}></div>
    )
}