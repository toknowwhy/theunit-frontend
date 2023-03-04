'use client'

import { VaultProp } from '@/app/types';
import { getLiquidateRatio } from '@/app/utils';
import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { useCollateralBalance } from '@/crypto/hooks/useCollateralBalance';
import { useCollateralDetail } from "@/crypto/hooks/useCollateralDetail";
import { useCurrentNetwork } from '@/crypto/hooks/useCurrentNetwork';
import { useSupportedCollaterals } from '@/crypto/hooks/useSupportedCollaterals';
import { BigNumber } from 'ethers';
import { keyBy } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { useContractRead } from 'wagmi';
import WithSupportedNetwork from './WithSupportedNetwork';

export default function ManageVault({ 
    symbol 
} : { 
    symbol: string
}) {
    const supportedCollaterals = useSupportedCollaterals();
    const collateralBySymbol = keyBy(supportedCollaterals, 'symbol');
    const collateral = collateralBySymbol[symbol];
    const { data } = useCollateralDetail(symbol);
    const currentNetwork = useCurrentNetwork();
    const { account, balance } = useCollateralBalance(collateral);
    const { balance: unitBalance } = useCollateralBalance(currentNetwork.unitToken);
    const enabled = Boolean(currentNetwork) && Boolean(account) && Boolean(collateral);
    const { data: vaultCollateralAmount } = useContractRead({
        ...currentNetwork.vault,
        functionName: "collateralAmount",
        enabled,
        args: [account, collateral.address]
    })
    const { data: vaultUnitDebt } = useContractRead({
        ...currentNetwork.unitToken,
        functionName: "unitDebt",
        enabled,
        args: [account, collateral.address]
    })
    
    const price =  0.9;
    const liquidationRatio = data ? getLiquidateRatio(data[0]) : 0;
    
    const props: VaultProp = {
        collateral,
        price,
        liquidationRatio,
        account,
        balance,
        vaultCollateralAmount: vaultCollateralAmount as BigNumber,
        vaultUnitDebt: vaultUnitDebt as BigNumber,
        unitBalance,
    }

    return <WithSupportedNetwork>
            <VaultHeader symbol={collateral.symbol} liquidationRatio={liquidationRatio} />
            <PriceRow price={price} />
            <VaultForm { ...props } />
            <ToastContainer 
                position="top-right"
                theme='dark'
                className='max-w-full'
            />
        </WithSupportedNetwork>
}