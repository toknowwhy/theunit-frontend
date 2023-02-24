'use client';

import { VaultProp } from '@/app/types';
import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { useCollateralDetail } from "@/crypto/hooks/useCollateralDetail";
import { useSupportedCollaterals } from '@/crypto/hooks/useSupportedCollaterals';
import { keyBy } from 'lodash';

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
        liquidationRatio: data ? data[0].toNumber() : 0
    }

    return <div>
        <VaultHeader { ...props } />
        <PriceRow { ...props } />
        <VaultForm { ...props } />
    </div>
}