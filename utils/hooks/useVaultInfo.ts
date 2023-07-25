import { formatEther } from "viem";
import { useContractReads, useFeeData } from "wagmi"
import { NetworkInfo, VaultInfoType } from '../types';

export const initialVaultInfo: VaultInfoType = {
    liquidationFee: 0.15,
    minUnit: 1000,
    collateralAmount: BigInt(0),
    unitAmount: BigInt(0),
    currentPrice: 0,
    nextPrice: 0,
    gasPrice: 0,
}

export const useVaultInfo = (currentNetwork?: NetworkInfo, account?: `0x${string}`) => {
    const { data: feeData } = useFeeData()
    const enabled = Boolean(currentNetwork) && Boolean(account);
    const { data: contractDatas, refetch } = useContractReads({
        enabled,
        contracts: [
            {
                ...currentNetwork!.Vault,
                functionName: "vaultOwnerAccount",
                args: [account!, currentNetwork!.Wrapped.address],
            },
            {
                ...currentNetwork!.Vault,
                functionName: "liquidationRatio",
            },
            {
                ...currentNetwork!.UnitPriceFeed,
                functionName: "latestRound",
            },
            {
                ...currentNetwork!.Vault,
                functionName: "minimumCollateral",
            },
        ],
    })
    const roundId = contractDatas ? (contractDatas[2].result as bigint) : undefined; 
    const { data: roundDatas } = useContractReads({
        enabled: enabled && Boolean(roundId),
        contracts: [
            {
                ...currentNetwork!.UnitPriceFeed,
                functionName: "getRoundData",
                args: [roundId! - BigInt(1)]
            },
            {
                ...currentNetwork!.UnitPriceFeed,
                functionName: "getRoundData",
                args: [roundId!]
            }
        ]
    })

    let defaultRes: VaultInfoType = initialVaultInfo

    if (feeData?.gasPrice) {
        defaultRes.gasPrice = parseFloat(formatEther(feeData.gasPrice))
    }

    
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
        defaultRes = {
            ...defaultRes,
            currentPrice: parseFloat(formatEther((roundDatas[0].result as any)[1])),
            nextPrice: parseFloat(formatEther((roundDatas[1].result as any)[1]))
        }
    }

    return {vaultInfo: defaultRes, refetch};
}