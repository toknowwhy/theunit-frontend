import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { pick } from 'lodash';
import { ReactNode } from 'react';
import BodyContainer from '@/components/navbar/BodyContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import VaultNetworkProvider from '@/components/vaults/VaultNetworkProvider';
import Web3Providers from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import ConnectWallet from '@/components/web3/ConnectWallet';

export default function ClientSideLayout({ children } : { children: ReactNode }) {
    const locale = useLocale();
    const messages = useMessages();

    return <NextIntlClientProvider
        locale={locale}
        messages={pick(messages!, 'Vault')}
    >
        <Web3Providers
            walletConnectId={process.env.WALLET_CONNECT_ID ?? ''} 
            infuraKey={process.env.INFURA_PROJECT_ID ?? ''}
            alchemyKey={process.env.ALCHEMY_KEY ?? ''}
        >
            <VaultNetworkProvider>
                <BodyContainer hasBgd>
                <ConnectWallet connectLabel='Connect' networkLabel='Switch' />
                    { children }
                </BodyContainer>
                <ToastContainer 
                    position="top-right"
                    theme='dark'
                    className='max-w-full'
                />
            </VaultNetworkProvider>
        </Web3Providers>
    </NextIntlClientProvider>
}