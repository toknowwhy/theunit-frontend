'use client'

import { VaultProp } from '@/app/types';
import { getLiquidateRatio } from '@/app/utils';
import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { useCollateralDetail } from "@/crypto/hooks/useCollateralDetail";
import { useSupportedCollaterals } from '@/crypto/hooks/useSupportedCollaterals';
import { keyBy } from 'lodash';
import { ToastContainer } from 'react-toastify';
import WithSupportedNetwork from './WithSupportedNetwork';

export default function ManageVault({ 
    symbol 
} : { 
    symbol: string
}) {
    const supportedCollaterals = useSupportedCollaterals();
    const collateralBySymbol = keyBy(supportedCollaterals, 'symbol');
    const collateral = collateralBySymbol[symbol];
    const { data, isError, isLoading } = useCollateralDetail(symbol);
    
    const price =  1287.0;
    
    const props: VaultProp = {
        collateral,
        price,
        liquidationRatio: data ? getLiquidateRatio(data[0]) : 0
    }

    return <WithSupportedNetwork>
        <>
            <VaultHeader { ...props } />
            <PriceRow { ...props } />
            <VaultForm { ...props } />
            <ToastContainer 
                position="top-right"
                theme='dark'
            />
        </>
    </WithSupportedNetwork>
}