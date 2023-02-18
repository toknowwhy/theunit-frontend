'use client';

import { VaultProp } from '@/app/types';
import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { useCollateralDetail } from "@/crypto/hooks/useCollateralDetail";
import { useSupportedCollaterals } from '@/crypto/hooks/useSupportedCollaterals';
import { keyBy } from 'lodash';
import { Dictionary } from 'ts-essentials';

export default function ManageVault({ 
    translations, 
    symbol 
} : { 
    translations: Dictionary<string>, 
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
        t: translations,
        liquidationRatio: data ? data[0].toNumber() : 0
    }


    return <>
        <VaultHeader { ...props } />
        <PriceRow { ...props } />
        <VaultForm { ...props } />
    </>
}