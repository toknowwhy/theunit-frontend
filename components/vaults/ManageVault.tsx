'use client'

import { useEffect, useState } from 'react';
import { useVaultInfo } from '@/utils/hooks/useVaultInfo';
import { ToastContainer } from 'react-toastify';
import { Address, useAccount } from 'wagmi';
import 'react-toastify/dist/ReactToastify.min.css';
import VaultForm from './form/VaultForm';
import VaultHeader from './info/VaultHeader';
import { useVaultContracts } from './VaultNetworkProvider';
import Loading from '@/app/[locale]/loading';
import { useSearchParams } from 'next/navigation';

export default function ManageVault() {

    const params = useSearchParams();
    const owner = params?.get('owner')
    const currentNetwork = useVaultContracts();
    const { address: account } = useAccount();
    const [mounted, setMounted] = useState(false);
    const {vaultInfo, refetch: refetchVaultInfo} = 
        useVaultInfo(currentNetwork, owner ? (owner as Address) : account);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Loading />
    }

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
                    owner={owner as Address}
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