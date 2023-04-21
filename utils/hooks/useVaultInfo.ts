import { BigNumber } from 'ethers';
import { useContractReads } from "wagmi"
import { Network } from "@/crypto/config"
import { VaultInfoType } from '../types';
import { formatEther, parseEther } from 'ethers/lib/utils.js';

export const initialVaultInfo: VaultInfoType = {
    liquidationFee: 0.15,
    minUnit: 1000,
    collateralAmount: BigNumber.from(0),
    unitAmount: BigNumber.from(0),
    currentPrice: 0,
    nextPrice: 0,
}

export const useVaultInfo = (collateralAddress: string, currentNetwork?: Network, account?: `0x${string}`) => {
    const enabled = Boolean(currentNetwork) && Boolean(account);
    const { data: contractDatas } = useContractReads({
        enabled,
        contracts: [
            {
                ...currentNetwork!.vault,
                functionName: "vaultOwnerAccount",
                args: [account, collateralAddress]
            },
            {
                ...currentNetwork!.vault,
                functionName: "liquidationRatio",
            },
            {
                ...currentNetwork!.priceFeed,
                functionName: "latestRound",
            },
            {
                ...currentNetwork!.vault,
                functionName: "minimumCollateral",
            },
        ],
    })
    const roundId = contractDatas ? (contractDatas[2] as BigNumber) : undefined; 
    const { data: roundDatas } = useContractReads({
        contracts: [
            {
                ...currentNetwork!.priceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId?.sub(BigNumber.from(1))]
            },
            {
                ...currentNetwork!.priceFeed,
                functionName: "getRoundData",
                enabled: enabled && Boolean(roundId),
                args: [roundId]
            }
        ]
    })

    let defaultRes: VaultInfoType = initialVaultInfo

    if (contractDatas?.length == 4) {
        defaultRes = {
            ...defaultRes,
            liquidationFee: ((contractDatas[1] as BigNumber).toNumber() / 1000 - 1),
            collateralAmount: (contractDatas[0] as any)[0] as BigNumber,
            unitAmount: (contractDatas[0] as any)[1] as BigNumber,
            minUnit: parseFloat(formatEther(contractDatas[3] as BigNumber))
        }
    }

    if (roundDatas?.length == 2) {
        defaultRes = {
            ...defaultRes,
            currentPrice: parseFloat(formatEther((roundDatas[0] as any)[1])),
            nextPrice: parseFloat(formatEther((roundDatas[1] as any)[1]))
        }
    }

    return defaultRes;
}