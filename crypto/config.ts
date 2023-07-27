import { default as allContracts } from './contracts.json'
import { sepolia, polygonMumbai } from 'wagmi/chains';
import { AllContracts, NetworkConfig } from '@/utils/types';
import { Dictionary } from 'ts-essentials';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
// The reason of hard coding chain ids is reading chains from wagmi
// has to be within client components
export const supportedNetworks: Dictionary<NetworkConfig> = {
    '11155111': {
        chain: sepolia,
        wrappedNative: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
        unitId: 'ethereum',
        sloganKey: 'eth-vault-description', 
        liquidationRatio: 1.15,
        dustLimit: 1000,
        nativeSymbol: 'ETH'
    },
    '80001': {
        chain: polygonMumbai,
        wrappedNative: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        unitId: 'matic-network',
        sloganKey: 'polygon-vault-description',
        liquidationRatio: 1.15,
        dustLimit: 1000,
        nativeSymbol: 'MATIC'
    },
};
