import { formatEther } from "viem";
import { useContractReads } from "wagmi"
import { NetworkInfoWithCollateral, VaultInfoType } from '../types';

export const initialVaultInfo: VaultInfoType = {
    liquidationFee: 0.15,
    minUnit: 1000,
    collateralAmount: BigInt(0),
    unitAmount: BigInt(0),
    currentPrice: 0,
    nextPrice: 0,
}

export const useVaultInfo = (currentNetwork: NetworkInfoWithCollateral, account?: `0x${string}`) => {
    const enabled = Boolean(currentNetwork) && Boolean(account);
    const collateralAddress = currentNetwork.collateral.address!
    const { data: contractDatas, refetch } = useContractReads({
        enabled,
        contracts: [
            {
                ...currentNetwork.Vault,
                functionName: "vaultOwnerAccount",
                args: [account!, collateralAddress],
            },
            {
                ...currentNetwork.Vault,
                functionName: "liquidationRatio",
                args: [collateralAddress]
            },
            {
                ...currentNetwork.UnitPriceFeed,
                functionName: "latestRound",
            },
            {
                ...currentNetwork.Vault,
                functionName: "minimumCollateral",
            },
        ],
    })
    const roundId = contractDatas ? (contractDatas[2].result as bigint) : undefined; 
    const { data: roundDatas } = useContractReads({
        enabled: enabled && Boolean(roundId),
        contracts: [
            {
                ...currentNetwork.UnitPriceFeed,
                functionName: "getRoundData",
                args: [roundId ? (roundId! - BigInt(1)) : BigInt(1)]
            },
            {
                ...currentNetwork.UnitPriceFeed,
                functionName: "getRoundData",
                args: [roundId!]
            }
        ]
    })

    let defaultRes: VaultInfoType = initialVaultInfo
    
    if (contractDatas?.length == 4) {
        defaultRes = {
            ...defaultRes,
            liquidationFee: Number(contractDatas[1].result as bigint),
            collateralAmount: contractDatas[0] ? ((contractDatas[0].result as any)[0] as bigint) : BigInt(0),
            unitAmount: contractDatas[0] ? ((contractDatas[0].result as any)[1] as bigint) : BigInt(0),
            minUnit: parseFloat(formatEther(contractDatas[3].result as bigint))
        }
    }

    if (roundDatas?.length == 2 && roundDatas[0] && roundDatas[1]) {
        const currPrice = parseFloat(formatEther((roundDatas[0].result as any)[1]));
        defaultRes = {
            ...defaultRes,
            currentPrice: currPrice,
            nextPrice: parseFloat(formatEther((roundDatas[1].result as any)[1]))
        }
    }

    return {vaultInfo: defaultRes, refetch};
}