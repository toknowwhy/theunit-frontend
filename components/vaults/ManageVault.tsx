'use client'

import { VaultInfoType } from '@/utils/types';
import { useCurrentNetworkContracts } from '@/utils/hooks/useCurrentNetwork';
import { useSupportedCollaterals } from '@/utils/hooks/useSupportedCollaterals';
import { keyBy } from 'lodash';
import { useEffect, useState } from 'react';
import { initialVaultInfo, useVaultInfo } from '@/utils/hooks/useVaultInfo';
import { ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';
import 'react-toastify/dist/ReactToastify.min.css';
import VaultForm from './form/VaultForm';
import VaultHeader from './info/VaultHeader';

export default function ManageVault({ 
    symbol 
} : { 
    symbol: string
}) {
    const supportedCollaterals = useSupportedCollaterals();
    const collateralBySymbol = keyBy(supportedCollaterals, 'symbol');
    const collateral = collateralBySymbol[symbol];
    const currentNetwork = useCurrentNetworkContracts();
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
                symbol={collateral.symbol} 
                liquidationFee={vaultInfo.liquidationFee} 
                minUnit={vaultInfo.minUnit}
                price={vaultInfo.currentPrice} 
                nextPrice={vaultInfo.nextPrice}
            />
            {collateral && (
                <VaultForm 
                    account={account} 
                    collateral={collateral} 
                    vaultInfo={vaultInfo} 
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