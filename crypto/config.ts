import { 
    VaultABI, 
    ERC20ABI, 
    CollateralManagerABI, 
    UnitRouterABI, 
    UnitTokenABI 
} from './abis';

import { default as goerliAddresses } from './addresses/goerli.json'
import { Abi, ContractDesc } from './types';
import { goerli as goerliChain } from 'wagmi/chains';
import { keyBy } from 'lodash'
import { Dictionary } from 'ts-essentials';

export const initialNetwork = goerliChain;

export const supportedCollateralsGoerli = [,
    "USDT"
];

export function contractDesc(abi: Abi[], address: string): ContractDesc {
    return { abi, address }
}

const infuraProjectId = process.env.INFURA_PROJECT_ID || ''
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY || ''

function getRpc(network: string): string {
    return `https://${network}.infura.io/v3/${infuraProjectId}`
}

const tokensGoerli = {
    USDT: contractDesc(ERC20ABI, goerliAddresses.USDT)
} as Dictionary<ContractDesc>

const goerli = {
    id: 5,
    name: 'goerli',
    label: 'Goerli test network',
    infuraUrl: getRpc('goerli'),
    safeConfirmations: 6,
    tokens: tokensGoerli,
    collateralManager: contractDesc(CollateralManagerABI, goerliAddresses.COLLATERAL_MANAGER),
    unitToken: contractDesc(UnitTokenABI, goerliAddresses.UNIT_TOKEN),
    unitRouter: contractDesc(UnitRouterABI, goerliAddresses.UNIT_ROUTER_V1),
    vault: contractDesc(VaultABI, goerliAddresses.VAULT),
    etherscan: {
        url: 'https://goerli.etherscan.io',
        apiUrl: 'https://api-goerli.etherscan.io/api',
        apiKey: etherscanAPIKey,
    },
}

export type Network = typeof goerli

const supportedNetworks = [goerli];

export const networkById = keyBy(supportedNetworks, 'id')
export const networkByName = keyBy(supportedNetworks, 'name')
