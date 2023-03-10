import { useContractDescByType } from "@/utils/hooks/useContractByType";
import { useTokenDesc } from "@/utils/hooks/useTokenDesc";
import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

export const useCollateralDetail = (symbol: string) => {
    const collateralContract = useContractDescByType("collateralManager");

    const collateralToken = useTokenDesc(symbol);
    const { data, isError, isLoading } = useContractRead({
        ...collateralContract,
        functionName: 'collateralsDetail',
        args: [collateralToken?.address]
    });
    return { 
        data : data as BigNumber[], 
        isError, 
        isLoading 
    };
}