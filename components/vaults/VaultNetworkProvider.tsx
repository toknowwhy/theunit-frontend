'use client';

import Loading from '@/app/[locale]/loading';
import { useCurrentNetworkContracts } from '@/utils/hooks/useCurrentNetwork';
import { useVaultTranslations } from '@/utils/hooks/useVaultTranslations';
import { NetworkInfo } from '@/utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import ConnectWallet from '../web3/ConnectWallet';

const VaultNetworkContext = createContext<NetworkInfo|undefined>(undefined);
export const useContracts = () => {
    const vaultContracts = useContext(VaultNetworkContext);
    return vaultContracts;
}

export default function VaultNetworkProvider({ 
    children 
} : {
    children: JSX.Element | JSX.Element[]
}) {

    const t = useVaultTranslations();

    const [mounted, setMounted] = useState(false)
    const network = useCurrentNetworkContracts();
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted) {
        return <Loading />
    }

    if (network) {
        return (
            <VaultNetworkContext.Provider value={network}>
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
