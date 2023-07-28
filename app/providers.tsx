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
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';
import { supportedNetworks as networks } from '@/crypto/config';

const supportedNetworks = Object.values(networks).map((n) => n.chain);
const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedNetworks,
  [publicProvider()],
)

export default function Providers({ 
  walletConnectId, 
  children 
} : { 
  walletConnectId: string, 
  children: ReactNode 
}) {

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
          initialChain={supportedNetworks[0]}
          showRecentTransactions={true}
        >
            {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}