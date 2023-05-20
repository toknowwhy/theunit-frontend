'use client'

import { VaultInfoType } from '@/utils/types';
import { useCurrentNetwork } from '@/utils/hooks/useCurrentNetwork';
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
    const currentNetwork = useCurrentNetwork();
    const { address: account } = useAccount();
    const [vaultInfo, setVaultInfo] = useState<VaultInfoType>(initialVaultInfo);
    const {vaultInfo: myVaultInfo, refetch: refetchVaultInfo} = useVaultInfo(collateral.address, currentNetwork, account);

    useEffect(() => {
        if (JSON.stringify(myVaultInfo) !== JSON.stringify(vaultInfo)) {
            setVaultInfo(myVaultInfo)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myVaultInfo])

    return <div className='bg-vault bg-no-repeat bg-right bg-cover min-h-[1000px] absolute left-0 top-0 right-0 bottom-0 px-4 lg:px-12 py-14'>
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
                    unitToken={currentNetwork.unitToken}
                    refetchVaultInfo={refetchVaultInfo}
                />
            )}
            <ToastContainer 
                position="top-right"
                theme='dark'
                className='max-w-full'
            />
        </div>
}