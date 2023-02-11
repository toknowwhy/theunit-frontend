'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PropsWithChildren } from 'react';

const { chains, provider } = configureChains(
    [mainnet],
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
      <RainbowKitProvider theme={darkTheme({
      accentColor: '#4844FF'
    })} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}