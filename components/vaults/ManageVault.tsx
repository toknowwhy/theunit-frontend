'use client'

import { VaultInfoType } from '@/utils/types';
import { useEffect, useState } from 'react';
import { initialVaultInfo, useVaultInfo } from '@/utils/hooks/useVaultInfo';
import { ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';
import 'react-toastify/dist/ReactToastify.min.css';
import VaultForm from './form/VaultForm';
import VaultHeader from './info/VaultHeader';
import { useVaultContracts } from './VaultNetworkProvider';

export default function ManageVault() {
    
    const currentNetwork = useVaultContracts();
    const { address: account } = useAccount();
    const [vaultInfo, setVaultInfo] = useState<VaultInfoType>(initialVaultInfo);
    const {vaultInfo: myVaultInfo, refetch: refetchVaultInfo} = useVaultInfo(currentNetwork, account);

    useEffect(() => {
        if (JSON.stringify(myVaultInfo) !== JSON.stringify(vaultInfo)) {
            setVaultInfo(myVaultInfo)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myVaultInfo])

    return <>
            <VaultHeader 
                symbol={currentNetwork?.nativeSymbol ?? 'ETH'} 
                liquidationFee={vaultInfo.liquidationFee} 
                minUnit={vaultInfo.minUnit}
                price={vaultInfo.currentPrice} 
                nextPrice={vaultInfo.nextPrice}
            />
            {currentNetwork && (
                <VaultForm 
                    account={account} 
                    vaultInfo={vaultInfo} 
                    networkInfo={currentNetwork}
                    refetchVaultInfo={refetchVaultInfo}
                />
            )}
            <ToastContainer 
                position="top-right"
                theme='dark'
                className='max-w-full'
            />
        </>
}