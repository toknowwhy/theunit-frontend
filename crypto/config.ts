import { default as allContracts } from './contracts.json'
import { erc20ABI, Address } from 'wagmi';
import { sepolia, polygonMumbai } from 'wagmi/chains';
import { keyBy } from 'lodash'
import { AllContracts, NetworkContracts } from '@/utils/types';

export const allNetworkContracts: AllContracts = allContracts.contracts as AllContracts;
export const supportedNetworks = [sepolia, polygonMumbai];
export const networkConigs = {
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



const infuraProjectId = process.env.INFURA_PROJECT_ID || ''
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY || ''

function getRpc(network: string): string {
    return `https://${network}.infura.io/v3/${infuraProjectId}`
}

// const sepolia = {
//     id: 11155111,
//     name: 'sepolia',
//     label: 'Sepolia test network',
//     infuraUrl: getRpc('sepolia'),
//     safeConfirmations: 6,
//     unitToken: tokenDesc('tinu', 'TINU', 'TINU', false, UnitTokenABI, sepoliaAddresses.UNIT_TOKEN as Address, 18),
//     unitRouter: contractDesc(UnitRouterABI, sepoliaAddresses.UNIT_ROUTER_V1 as Address),
//     vault: contractDesc(VaultABI, sepoliaAddresses.VAULT as Address),
//     priceFeed: contractDesc(PriceFeedABI, sepoliaAddresses.PRICE_FEED as Address),
//     tokens: defaultSupportedCollaterals,
//     ETHAddress: sepoliaAddresses.WETH,
//     etherscan: {
//         url: 'https://sepolia.etherscan.io',
//     },
// }


export type Network = typeof sepolia

export const networkById = keyBy(supportedNetworks, 'id')
export const networkByName = keyBy(supportedNetworks, 'name')
