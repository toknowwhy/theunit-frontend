'use client'

import { useEffect, useState } from 'react';
import { useVaultInfo } from '@/utils/hooks/useVaultInfo';
import { useAccount } from 'wagmi';
import VaultForm from './form/VaultForm';
import VaultHeader from './info/VaultHeader';
import { useContracts } from './VaultNetworkProvider';
import Loading from '@/app/[locale]/loading';
import { useSearchParams } from 'next/navigation';
import { supportedNetworks } from '@/crypto/config';
import { Address } from 'viem';

export default function ManageVault({
    collateral
} : {
    collateral: string
}) {

    const networkInfo = useContracts()!;
    const currentCollateral = supportedNetworks[networkInfo.id].supportedCollaterals.filter((sc) => sc.symbol === collateral)[0];
    const networkInfoWithCollateral = {...networkInfo, collateral: currentCollateral}

    const params = useSearchParams();
    const owner = params?.get('owner')
    const { address: account } = useAccount();
    const [mounted, setMounted] = useState(false);
    const {vaultInfo, refetch: refetchVaultInfo} = 
        useVaultInfo(networkInfoWithCollateral, owner ? (owner as Address) : account);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Loading />
    }

    return <>
            <VaultHeader 
                symbol={currentCollateral.symbol} 
                liquidationFee={vaultInfo.liquidationFee} 
                minUnit={vaultInfo.minUnit}
                price={vaultInfo.currentPrice} 
                nextPrice={vaultInfo.nextPrice}
                spline={networkInfoWithCollateral.collateral.splineLogo}
            />
            <VaultForm 
                account={account} 
                owner={owner as Address}
                vaultInfo={vaultInfo} 
                networkInfo={networkInfo}
                refetchVaultInfo={refetchVaultInfo}
            />
        </>
}