import { default as allContracts } from './contracts.json'
import { sepolia, polygonMumbai } from 'wagmi/chains';
import { AllContracts, SupportedChainId } from '@/utils/types';
import { Dictionary } from 'ts-essentials';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
export const supportedNetworks = [sepolia, polygonMumbai];
export const supportedChainIds: number[] = supportedNetworks.map((sn) => sn.id);
export const networkConigs: Dictionary<any, SupportedChainId> = {
    [sepolia.id]: {
        wrappedNative: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
        unitId: 'ethereum',
        sloganKey: 'eth-vault-description', 
        liquidationRatio: 1.15,
        dustLimit: 1000,
    },
    [polygonMumbai.id]: {
        wrappedNative: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        unitId: 'matic-network',
        sloganKey: 'polygon-vault-description',
        liquidationRatio: 1.15,
        dustLimit: 1000,
    }
}
