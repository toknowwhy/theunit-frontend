'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PropsWithChildren } from 'react';
import { initialNetwork } from '@/crypto/config';

const { chains, provider } = configureChains(
    [sepolia],
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
          initialChain={initialNetwork}
          showRecentTransactions={true}
        >
            {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}