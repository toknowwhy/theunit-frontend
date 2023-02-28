'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PropsWithChildren } from 'react';
import { initialNetwork } from '@/crypto/config';

const { chains, provider } = configureChains(
    [goerli],
    [publicProvider()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'The Unit',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

export default function WalletProvider({ children } : PropsWithChildren<{}>) {
  return (
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
  );
}