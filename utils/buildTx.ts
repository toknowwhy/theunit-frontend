import { Address, BaseError, ContractFunctionRevertedError, PublicClient, formatEther, parseEther } from "viem"
import { ContractDesc } from "./types"
import { toast } from "react-toastify"

export default async function buildTx({
    publicClient,
    walletClient,
    account,
    contract,
    args,
    value,
    functionName,
    errMsg,
} : {
    publicClient: PublicClient,
    walletClient?: any,
    account?: Address,
    contract: ContractDesc,
    args?: any[],
    value?: number,
    functionName: string,
    errMsg: string,
}) {

    try {
        const { request } = await publicClient.simulateContract({
          account: account!,
          ...contract,
          functionName,
          args,
          value: value ? parseEther(value.toString()) : undefined
      })

        const callTransaction = () => { return walletClient!.writeContract(request) }
        return callTransaction;

    } catch (err) {
        if (err instanceof BaseError) {
          const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
          if (revertError instanceof ContractFunctionRevertedError) {
            const errorName = revertError.data?.errorName ?? ''
            toast.error(errorName);
          } else {
            toast.error(errMsg)
          }
        } else {
            toast.error(errMsg)
        }
        return null;
    }
}