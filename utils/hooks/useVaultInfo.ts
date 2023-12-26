import { Abi, formatEther } from "viem";
import { useContractReads } from "wagmi"
import { ContractDesc, NetworkInfoWithCollateral, VaultInfoType } from '../types';
import { PriceFeedABI } from "@/crypto/PriceFeedABI";

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
    const collateralAddress = currentNetwork.collateral.address!;
    const priceFeedDesc: ContractDesc = {
        address: currentNetwork.collateral.priceFeed,
        abi: PriceFeedABI as Abi
    }
    console.log('BBBB', priceFeedDesc)
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
                ...priceFeedDesc,
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
                ...priceFeedDesc,
                functionName: "getRoundData",
                args: [roundId ? (roundId! - BigInt(1)) : BigInt(1)]
            },
            {
                ...priceFeedDesc,
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