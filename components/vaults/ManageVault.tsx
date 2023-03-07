'use client'

import { VaultProp } from '@/app/types';
import { getLiquidateRatio } from '@/app/utils';
import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { useCurrentNetwork } from '@/crypto/hooks/useCurrentNetwork';
import { useSupportedCollaterals } from '@/crypto/hooks/useSupportedCollaterals';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { keyBy } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { useAccount, useContractReads } from 'wagmi';
import WithSupportedNetwork from './WithSupportedNetwork';

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
    
    const enabled = Boolean(currentNetwork) && Boolean(account);
    const { data: contractDatas, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...currentNetwork.collateralManager,
                functionName: 'collateralsDetail',
                args: [collateral.address]
            },
            {
                ...currentNetwork.vault,
                functionName: "collateralAmount",
                enabled,
                args: [account, collateral.address]
            },
            {
                ...currentNetwork.unitToken,
                functionName: "unitDebt",
                enabled,
                args: [account, collateral.address]
            },
            {
                ...currentNetwork.priceFeed,
                functionName: "latestRound",
                enabled
            },
        ],
    })

    const liquidationRatio = contractDatas ? getLiquidateRatio((contractDatas[0] as any)[0]) : 0;
    const roundId = contractDatas ? (contractDatas[3] as BigNumber).toNumber() : 0;
    const vaultCollateralAmount = contractDatas ? (contractDatas[1] as BigNumber) : BigNumber.from(0);
    const vaultUnitDebt = contractDatas ? (contractDatas[2] as BigNumber) : BigNumber.from(0);

    const { data: roundDatas } = useContractReads({
        contracts: [
            {
                ...currentNetwork.priceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId-1]
            },
            {
                ...currentNetwork.priceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId]
            }
        ]
    })

    const { currentPrice,  nextPrice } = getPrice(collateral.decimals, roundDatas);
    
    const props: VaultProp = {
        collateral,
        price: currentPrice,
        liquidationRatio,
        account,
        vaultCollateralAmount: vaultCollateralAmount,
        vaultUnitDebt: vaultUnitDebt,
        unitToken: currentNetwork.unitToken,
    }

    return <WithSupportedNetwork>
            <VaultHeader symbol={collateral.symbol} liquidationRatio={liquidationRatio} />
            <PriceRow price={currentPrice} nextPrice={nextPrice} />
            <VaultForm { ...props } />
            <ToastContainer 
                position="top-right"
                theme='dark'
                className='max-w-full'
            />
        </WithSupportedNetwork>
}

const getPrice = (decimals: number, data?: unknown) => {
    if (!data) {
        return {
            currentPrice: 0,
            nextPrice: 0
        }
    }

    const priceData = data as BigNumber[][];
    const currentPriceData = formatUnits(priceData[0][1], decimals);
    const nextPriceData = formatUnits(priceData[1][1], decimals);
    return {
        currentPrice: 1 / parseFloat(currentPriceData),
        nextPrice: 1 / parseFloat(nextPriceData),
    }
}