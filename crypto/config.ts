import { default as allContracts } from './contracts.json'
import { arbitrumGoerli, optimismGoerli } from 'wagmi/chains';
import { AllContracts, NetworkConfig } from '@/utils/types';
import { Dictionary } from 'ts-essentials';
import { keyBy } from 'lodash';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
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
    },
    '420': {
        chain: optimismGoerli,
        wrappedNative: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        unitId: 'matic-network',
        sloganKey: 'polygon-vault-description',
        liquidationRatio: 1.15,
        dustLimit: 1000,
        nativeSymbol: 'MATIC',
        subgraphUrl: 'https://api.studio.thegraph.com/proxy/49276/tinu-vault-mumbai/version/latest',
        splineLogo: 'https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode',
    },
};
export const networkByUnitId = keyBy(Object.values(supportedNetworks), 'unitId')
