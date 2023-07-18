'use client';

import { useCurrentNetworkContracts } from '@/utils/hooks/useCurrentNetwork';
import { useVaultTranslations } from '@/utils/hooks/useVaultTranslations';
import { NetworkInfo } from '@/utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import ConnectWallet from '../web3/ConnectWallet';

const VaultNetworkContext = createContext<NetworkInfo|undefined>(undefined);
export const useVaultContracts = () => {
    const vaultContracts = useContext(VaultNetworkContext);
    return vaultContracts;
}

export default function VaultNetworkProvider({ children } : {children: JSX.Element | JSX.Element[]}) {

    const t = useVaultTranslations();

    const [networkInfo, setNetworkInfo] = useState<NetworkInfo|undefined>()
    const network = useCurrentNetworkContracts();

    useEffect(() => {
        if (network) {
            setNetworkInfo(network);
        }
    }, [network])

    if (network) {
        return (
            <VaultNetworkContext.Provider value={networkInfo}>
                {children}
            </VaultNetworkContext.Provider>
        )
    }

    return (
        <div className='text-center mt-48'>
            <ConnectWallet connectLabel={t('connect-wallet')} networkLabel={t('switch-network')} />
        </div>
    )
}
