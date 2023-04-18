'use client'

import { VaultProp } from '@/utils/types';
import { getLiquidateRatio } from '@/utils/functions';
import PriceRow from './info/PriceRow';
import VaultForm from './form/VaultForm';
import VaultHeader from './info/VaultHeader';
import { useCurrentNetwork } from '@/utils/hooks/useCurrentNetwork';
import { useSupportedCollaterals } from '@/utils/hooks/useSupportedCollaterals';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { keyBy } from 'lodash';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAccount, useContractReads } from 'wagmi';
import 'react-toastify/dist/ReactToastify.min.css';

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

    const [contractReadDatas, setContractReadDatas] = useState();
    const [priceDatas, setPriceDatas] = useState<BigNumber[][] | undefined>();
    
    const enabled = Boolean(currentNetwork) && Boolean(account);
    const { data: contractDatas } = useContractReads({
        contracts: [
            {
                ...currentNetwork.vault,
                functionName: "vaultOwnerAccount",
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
    
    // const liquidationRatio = contractReadDatas ? getLiquidateRatio((contractReadDatas[0] as any)[0]) : 1;
    const liquidationRatio = 1;
    const roundId = contractReadDatas ? (contractReadDatas[1] as BigNumber).toNumber() : 2;
    const vaultCollateralAmount = contractReadDatas ? (contractReadDatas[0][0] as BigNumber) : BigNumber.from(0);
    const vaultUnitDebt = contractReadDatas ? (contractReadDatas[0][1] as BigNumber) : BigNumber.from(0);

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

    const { currentPrice,  nextPrice } = getPrice(collateral.decimals, priceDatas);

    useEffect(() => {
        if (contractDatas) {
            setContractReadDatas(contractDatas as any);
        }
        if (roundDatas) {
            setPriceDatas(roundDatas as BigNumber[][]);
        }
    }, [contractDatas, roundDatas])
    
    const props: VaultProp = {
        collateral,
        price: currentPrice,
        liquidationRatio,
        account,
        vaultCollateralAmount: vaultCollateralAmount,
        vaultUnitDebt: vaultUnitDebt,
        unitToken: currentNetwork.unitToken,
    }

    return <>
            <VaultHeader symbol={collateral.symbol} liquidationRatio={liquidationRatio} />
            <PriceRow price={currentPrice} nextPrice={nextPrice} />
            {collateral && <VaultForm { ...props } />}
            <ToastContainer 
                position="top-right"
                theme='dark'
                className='max-w-full'
            />
        </>
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