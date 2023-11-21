'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { configureChains, WagmiConfig, createConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { initialChain, supportedNetworks as networks } from '@/crypto/config';

const supportedNetworks = Object.values(networks).map((n) => n.chain);

export default function Providers({ 
  walletConnectId, 
  infuraKey,
  alchemyKey,
  children 
} : { 
  walletConnectId: string, 
  infuraKey: string,
  alchemyKey: string,
  children: ReactNode 
}) {
  
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    supportedNetworks,
    [infuraProvider({ apiKey: infuraKey }), publicProvider()],
  )
  const { wallets } = getDefaultWallets({
    appName: 'UNIT APP',
    projectId: walletConnectId,
    chains,
  });
  
  const connectors = connectorsForWallets([
    ...wallets,
  ]);
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#4844FF'
          })} 
          chains={chains}
          initialChain={initialChain}
          showRecentTransactions={true}
        >
            {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}