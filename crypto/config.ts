import { 
    VaultABI, 
    UnitRouterABI, 
    UnitTokenABI,
    PriceFeedABI, 
    ERC20ABI,
} from './abis';

import { default as sepoliaAddresses } from './addresses/sepholia.json'
import { Abi, Address, ContractDesc, TokenDesc } from '@/utils/types';
import { sepolia as sepoliaChain } from 'wagmi/chains';
import { keyBy } from 'lodash'

export const initialNetwork = sepoliaChain;

export function contractDesc(abi: Abi[], address: Address): ContractDesc {
    return { abi, address }
}

export function tokenDesc(
    coinId: string, 
    name: string, 
    symbol: string, 
    stable: boolean, 
    abi: Abi[], 
    address: Address,
    decimals: number,
): TokenDesc {
    return { coinId, name, symbol, stable, abi, address, decimals }
}

export const supportedCollaterals = [
    tokenDesc('ethereum', 'Ethereum', 'ETH', false, ERC20ABI, sepoliaAddresses.WETH as Address, 18),
] as Array<TokenDesc>

const infuraProjectId = process.env.INFURA_PROJECT_ID || ''
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY || ''

function getRpc(network: string): string {
    return `https://${network}.infura.io/v3/${infuraProjectId}`
}

const sepolia = {
    id: 11155111,
    name: 'sepolia',
    label: 'Sepolia test network',
    infuraUrl: getRpc('sepolia'),
    safeConfirmations: 6,
    unitToken: tokenDesc('unit', 'UNIT Token', 'UNIT', false, UnitTokenABI, sepoliaAddresses.UNIT_TOKEN as Address, 18),
    unitRouter: contractDesc(UnitRouterABI, sepoliaAddresses.UNIT_ROUTER_V1 as Address),
    vault: contractDesc(VaultABI, sepoliaAddresses.VAULT as Address),
    priceFeed: contractDesc(PriceFeedABI, sepoliaAddresses.PRICE_FEED as Address),
    tokens: supportedCollaterals,
    etherscan: {
        url: 'https://sepolia.etherscan.io',
        apiUrl: 'https://api-sepolia.etherscan.io/api',
        apiKey: etherscanAPIKey,
    },
}

export type Network = typeof sepolia

const supportedNetworks = [sepolia];

export const networkById = keyBy(supportedNetworks, 'id')
export const networkByName = keyBy(supportedNetworks, 'name')
