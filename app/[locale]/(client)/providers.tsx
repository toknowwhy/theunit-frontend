'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { ReactNode } from 'react';
import { initialChain, supportedNetworks as networks } from '@/crypto/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { arbitrumGoerli } from 'viem/chains';

// const supportedNetworks = Object.values(networks).map((n) => n.chain);

export default function Web3Providers({ 
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

  const { wallets } = getDefaultWallets();
  const config = getDefaultConfig({
    appName: 'UNIT App',
    projectId: walletConnectId,
    wallets: [
      ...wallets,
      {
        groupName: 'Other',
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [arbitrumGoerli],
    ssr: true,
  });

  const queryClient = new QueryClient();
  
  return (
    <ThemeProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: '#4844FF'
            })} 
            initialChain={initialChain}
            showRecentTransactions={true}
          >
              {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}