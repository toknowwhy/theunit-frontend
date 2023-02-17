import * as ERC20 from './abis/ERC20.json';
import * as CollateralManager from './abis/CollateralManager.json';
import * as UnitToken from './abis/UnitToken.json';
import * as UnitRouterV1 from './abis/UnitRouterV1.json';
import * as Vault from './abis/Vault.json';

import { default as goerliAddresses } from './addresses/goerli.json'
import { Abi, ContractDesc } from './types';
import { keyBy } from 'lodash'
import { Dictionary } from 'ts-essentials';

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
    USDT: contractDesc(ERC20, goerliAddresses.USDT)
} as Dictionary<ContractDesc>

const goerli = {
    id: '5',
    name: 'goerli',
    label: 'Goerli test network',
    infuraUrl: getRpc('goerli'),
    safeConfirmations: 6,
    tokens: tokensGoerli,
    collateralManager: contractDesc(CollateralManager, goerliAddresses.COLLATERAL_MANAGER),
    unitToken: contractDesc(UnitToken, goerliAddresses.UNIT_TOKEN),
    unitRouter: contractDesc(UnitRouterV1, goerliAddresses.UNIT_ROUTER_V1),
    vault: contractDesc(Vault, goerliAddresses.VAULT),
    etherscan: {
        url: 'https://goerli.etherscan.io',
        apiUrl: 'https://api-goerli.etherscan.io/api',
        apiKey: etherscanAPIKey,
    },
}

const supportedNetworks = [goerli];

export const networkById = keyBy(supportedNetworks, 'id')
export const networkByName = keyBy(supportedNetworks, 'name')