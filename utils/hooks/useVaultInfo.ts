import { BigNumber } from 'ethers';
import { useContractReads, useFeeData } from "wagmi"
import { NetworkInfo, VaultInfoType } from '../types';
import { formatEther } from 'ethers/lib/utils.js';

export const initialVaultInfo: VaultInfoType = {
    liquidationFee: 0.15,
    minUnit: 1000,
    collateralAmount: BigNumber.from(0),
    unitAmount: BigNumber.from(0),
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
                args: [account, currentNetwork!.Wrapped]
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
    const roundId = contractDatas ? (contractDatas[2] as BigNumber) : undefined; 
    const { data: roundDatas } = useContractReads({
        contracts: [
            {
                ...currentNetwork!.UnitPriceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId?.sub(BigNumber.from(1))]
            },
            {
                ...currentNetwork!.UnitPriceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId]
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
            liquidationFee: (contractDatas[1] as BigNumber).toNumber(),
            collateralAmount: contractDatas[0] ? ((contractDatas[0] as any)[0] as BigNumber) : BigNumber.from(0),
            unitAmount: contractDatas[0] ? ((contractDatas[0] as any)[1] as BigNumber) : BigNumber.from(0),
            minUnit: parseFloat(formatEther(contractDatas[3] as BigNumber))
        }
    }

    if (roundDatas?.length == 2 && roundDatas[0] && roundDatas[1]) {
        defaultRes = {
            ...defaultRes,
            currentPrice: parseFloat(formatEther((roundDatas[0] as any)[1])),
            nextPrice: parseFloat(formatEther((roundDatas[1] as any)[1]))
        }
    }

    return {vaultInfo: defaultRes, refetch};
}