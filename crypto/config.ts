import { default as allContracts } from './contracts.json'
import { arbitrumGoerli, arbitrum } from 'wagmi/chains';
import { AllContracts, NetworkConfig } from '@/utils/types';
import { Dictionary } from 'ts-essentials';
import { keyBy } from 'lodash';
import { Address } from 'viem';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
export const isTestnet = true;
export const initialChain = isTestnet ? arbitrumGoerli : arbitrum;
const tickets: Address[] = isTestnet ? ['0x1555f22AA4E629A3ec259126D5Ec204CE146dA43'] : [];
const btcPriceFeed: Address = '0x5148FA700a8dCe5777e475f239E285a1b3dfC3ec'
const ethPriceFeed: Address = '0x481aE08bE993e853E163D9c39a9a5e86760aD281'

// The reason of hard coding chain ids is reading chains from wagmi
// has to be within client components
export const supportedNetworks: Dictionary<NetworkConfig> = {
    '421614': {
        chain: arbitrumGoerli,
        sloganKey: 'eth-vault-description', 
        subgraphUrl: 'https://api.studio.thegraph.com/query/49276/tinu-vault-sepolia/version/latest',
        bridgedUN: '0x4CEcd017a9bA4dAbDC3d35A042Ea16ace0325115',
        tickets,
        supportedCollaterals: [
            {
                symbol: 'ETH',
                dustLimit: 1000,
                unitId: 'ethereum',
                splineLogo: 'https://prod.spline.design/fMMC-bW1jfG6gieo/scene.splinecode',
                liquidationRatio: 1.15,
                address: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
                priceFeed: ethPriceFeed
            },
            {
                symbol: 'WBTC',
                dustLimit: 1000,
                unitId: 'wrapped-bitcoin',
                splineLogo: 'https://prod.spline.design/eRzonbZrwnTxxYbA/scene.splinecode',
                liquidationRatio: 1.15,
                address: '0xB24D631e7899F6D89eF9C6dEa293A6527e8a3438',
                priceFeed: btcPriceFeed
            },
            {
                symbol: 'stETH',
                dustLimit: 1000,
                unitId: 'lido-staked-ether',
                splineLogo: 'https://prod.spline.design/fMMC-bW1jfG6gieo/scene.splinecode',
                liquidationRatio: 1.15,
                address: '0xB24D631e7899F6D89eF9C6dEa293A6527e8a3438',
                priceFeed: ethPriceFeed
            }
        ]
    },
};
