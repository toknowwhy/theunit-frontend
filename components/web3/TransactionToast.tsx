"use client"

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations"
import { useVaultContracts } from "../vaults/VaultNetworkProvider"
import BlockExplorerLink from "./BlockExplorerLink"

export enum TransactionToastStatus {
    pendingUserConfirmation = 'pendingUserConfirmation',
    pending = 'pending',
    cancelled = 'cancelled',
    success = 'success',
    error = 'error'
  }
  
export default function TransactionToast({
    message,
    chainId,
    status,
    hash,
} : {
    message: string
    chainId: number
    status: TransactionToastStatus
    hash?: string
}) {
    const t = useVaultTranslations();
    const network = useVaultContracts();
  
    let _status;

    if (status === TransactionToastStatus.pendingUserConfirmation) {
        _status = t('wallet-confirm')
    } else if (status === TransactionToastStatus.pending) {
        _status = t('blockchain-confirm')
    } else if (status === TransactionToastStatus.cancelled) {
        _status = t('cancelled')
    } else if (status === TransactionToastStatus.success) {
        _status = t('success')
    } else if (status === TransactionToastStatus.error) {
        _status = t('error')
    }
  
    return (
      <div className='flex flex-col'>
        <div>{message}</div>
        <div className='flex gap-x-1 opacity-80'>
          <div className='text-xs'>{_status}</div>
          {hash && (
            <>
              <div className='text-xs'>|</div>
              <BlockExplorerLink className='text-xs' txHash={hash} network={network!} >
                {t('receipt')}
              </BlockExplorerLink>
            </>
          )}
        </div>
      </div>
    )
}
  