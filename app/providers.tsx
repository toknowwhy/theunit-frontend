'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { PropsWithChildren } from 'react';
import { supportedNetworks } from '@/crypto/config';

const { chains, provider } = configureChains(
    supportedNetworks,
    [publicProvider()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'UNIT',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

export default function Providers({ children } : PropsWithChildren<{}>) {
  return (
    <ThemeProvider>
      <WagmiConfig client={wagmiClient}>
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