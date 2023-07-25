'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { configureChains, WagmiConfig, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { PropsWithChildren } from 'react';
import { supportedNetworks } from '@/crypto/config';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedNetworks,
  [publicProvider()],
)
  
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function Providers({ children } : PropsWithChildren<{}>) {
  return (
    <ThemeProvider>
      <WagmiConfig config={config}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#4844FF'
          })} 
          chains={chains}
          initialChain={supportedNetworks[0]}
          showRecentTransactions={true}
        >
            {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}