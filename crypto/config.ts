import { default as allContracts } from './contracts.json'
import { arbitrumGoerli, arbitrum } from 'wagmi/chains';
import { AllContracts, NetworkConfig } from '@/utils/types';
import { Dictionary } from 'ts-essentials';
import { keyBy } from 'lodash';
import { Address } from 'viem';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
export const isTestnet = true;
export const initialChain = isTestnet ? arbitrumGoerli : arbitrum;
export const tickets: Address[] = isTestnet ? ['0x1555f22AA4E629A3ec259126D5Ec204CE146dA43'] : [];
// The reason of hard coding chain ids is reading chains from wagmi
// has to be within client components
export const supportedNetworks: Dictionary<NetworkConfig> = {
    '421613': {
        chain: arbitrumGoerli,
        wrappedNative: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        unitId: 'ethereum',
        sloganKey: 'eth-vault-description', 
        liquidationRatio: 1.15,
        dustLimit: 1000,
        nativeSymbol: 'ETH',
        subgraphUrl: 'https://api.studio.thegraph.com/query/49276/tinu-vault-sepolia/version/latest',
        splineLogo: 'https://prod.spline.design/fMMC-bW1jfG6gieo/scene.splinecode',
        bridgedUN: '0x983542016D5417Cf36A10521756a790c2c5BFDA3',
        tickets,
    },
};
export const networkByUnitId = keyBy(Object.values(supportedNetworks), 'unitId')