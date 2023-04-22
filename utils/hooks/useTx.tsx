import { useSetAtom } from "jotai";
import { useAccount } from "wagmi";
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContentProps } from "react-toastify";
import { createTransactionsAtom, updateTransactionsAtom } from "../atoms";
import { useCurrentNetwork } from "./useCurrentNetwork";
import { SendTransactionOptions, TransactionCallbacks, TransactionState, TransactionStatus } from "@/utils/types";
import TransactionToast, { TransactionToastStatus } from "@/components/web3/TransactionToast";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

export const useTx = () => {
    const { address: usersAddress } = useAccount();
    const { id: chainId } = useCurrentNetwork();
    const addRecentTransaction = useAddRecentTransaction();
    const createTransaction = useSetAtom(createTransactionsAtom)
    const updateTransaction = useSetAtom(updateTransactionsAtom)
    let response: TransactionResponse
    let receipt: TransactionReceipt

    const sendTransaction = async (
        id: string,
        name: string,
        chainId: number,
        callTransaction: () => Promise<TransactionResponse>,
        callbacks?: TransactionCallbacks
    ) => {

        try {
            callbacks?.onSentToWallet?.(id)
            const responsePromise = callTransaction()
            toast.promise(responsePromise, {
              pending: {
                icon: true,
                render: () => {
                  return (
                    <TransactionToast
                      message={name}
                      chainId={chainId}
                      status={TransactionToastStatus.pendingUserConfirmation}
                    />
                  )
                }
              }
            })
            response = await responsePromise;
            if (response.chainId == 0) {
              response.chainId = chainId
            }
            // Transaction was confirmed in users wallet
            updateTransaction({ id, response, status: TransactionStatus.pendingBlockchainConfirmation })
            callbacks?.onConfirmedByUser?.(id)
            if (response.hash) {
              addRecentTransaction({
                hash: response.hash,
                description: name,
              });
            }
            const receiptPromise = response.wait()
            toast.promise(receiptPromise, {
              pending: {
                icon: true,
                render: () => {
                  return (
                    <TransactionToast
                      message={name}
                      chainId={chainId}
                      status={TransactionToastStatus.pending}
                    />
                  )
                }
              },
              success: {
                icon: true,
                render: (props: ToastContentProps<TransactionReceipt>) => {
                  const { data } = props
                  return (
                    <TransactionToast
                      message={name}
                      chainId={chainId}
                      status={TransactionToastStatus.success}
                      hash={data?.transactionHash}
                    />
                  )
                }
              },
              error: {
                icon: true,
                render: (props: ToastContentProps<TransactionReceipt>) => {
                  const { data } = props
                  return (
                    <TransactionToast
                      message={name}
                      chainId={chainId}
                      status={TransactionToastStatus.error}
                      hash={data?.transactionHash}
                    />
                  )
                }
              }
            })
            receipt = await receiptPromise
      
            // Transaction was confirmed on chain
            callbacks?.onComplete?.(id)
            const status =
              !!receipt.status && receipt.status === 1
                ? TransactionStatus.success
                : TransactionStatus.error
            updateTransaction({ id, receipt, status, state: TransactionState.complete })
            if (status === TransactionStatus.success) {
              callbacks?.onSuccess?.(id)
            } else {
              callbacks?.onError?.(id)
            }
      
            callbacks?.refetch?.(id)
          } catch (e: any) {
            if (e?.message?.match('User denied transaction signature')) {
              updateTransaction({
                id,
                status: TransactionStatus.cancelled,
                state: TransactionState.complete
              })
              toast.error(
                <TransactionToast
                  message={name}
                  chainId={chainId}
                  status={TransactionToastStatus.cancelled}
                  hash={receipt?.transactionHash}
                />
              )
            } else if (e?.error?.message) {
      
              updateTransaction({
                id,
                receipt,
                status: TransactionStatus.error,
                state: TransactionState.complete
              })
              const errorMessage = `Transaction failed - ${e.error.message}`
              toast.error(
                <TransactionToast
                  message={errorMessage}
                  chainId={chainId}
                  status={TransactionToastStatus.cancelled}
                  hash={receipt?.transactionHash}
                />
              )
            } else {
              updateTransaction({
                id,
                receipt,
                status: TransactionStatus.error,
                state: TransactionState.complete
              })
              const errorMessage = `Transaction failed`
              toast.error(
                <TransactionToast
                  message={errorMessage}
                  chainId={chainId}
                  status={TransactionToastStatus.cancelled}
                  hash={receipt?.transactionHash}
                />
              )
            }
        }
    }
  
    return (options: SendTransactionOptions) => {
      const { name, callTransaction, callbacks } = options
      const id: string = uuidv4()
      createTransaction({ id, name, chainId, usersAddress: (usersAddress as string) })
      sendTransaction(id, name, chainId, callTransaction, callbacks)
      return id
    }
  }