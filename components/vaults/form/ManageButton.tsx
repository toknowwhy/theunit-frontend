import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { usePublicClient, useWalletClient } from "wagmi";
import { useState } from "react";
import { toast } from "react-toastify";
import TxButton from "@/components/web3/TxButton";
import { VaultButtonProps, WriteResponse } from "@/utils/types";
import { ContractFunc } from "@/utils/types";
import { useVaultContracts } from "../VaultNetworkProvider";
import { parseEther } from "viem";
import buildTx from "@/utils/buildTx";

export default function ConfirmBtn({ 
    collateral, 
    account, 
    collateralAmount, 
    isManage, 
    unitAmount,
    gasPrice,
    reset, 
    isClosing,
    unitBalance,
    collateralBalance,
} : VaultButtonProps) {
    const t = useVaultTranslations();
    const [txId, setTxId] = useState('');
    const sendTx = useTx();
    const network = useVaultContracts();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient()

    let action: ContractFunc|undefined;
    let msgValue: number = 0;
    let transactionName: string = '';
    const collateralAmountInWei = parseEther(Math.abs(collateralAmount).toString());
    const unitAmountInWei = parseEther(Math.abs(unitAmount).toString());
    let params: any[] = [unitAmountInWei, account];
    if (collateralAmount > 0) {
        if (unitAmount > 0) {
            action = 'increaseETHAndMint'
            transactionName = 'deposit-mint'
        } else if (unitAmount == 0) {
            action = 'increaseETH'
            params = [account]
            transactionName = 'deposit'
        } else {
            action = 'increaseETHAndBurn'
            transactionName = 'deposit-burn'
            params = [unitAmountInWei, account]
        }
        msgValue = collateralAmount;
    } else if (collateralAmount == 0) {
        if (unitAmount > 0) {
            action = 'increaseETHAndMint'
            transactionName = 'mint'
        } else if (unitAmount < 0) {
            action = 'decreaseETHAndBurn'
            transactionName = 'burn'
            if (isClosing) {
                params = [collateralBalance, unitBalance, account]
            } else {
                params = [collateralAmountInWei, unitAmountInWei, account]
            }
        }
    } else {
        if (unitAmount < 0) {
            action = 'decreaseETHAndBurn'
            transactionName = 'withdraw-burn'
            params = [collateralAmountInWei, unitAmountInWei, account]
        } else if (unitAmount == 0) {
            action = 'decreaseETH'
            params = [collateralAmountInWei, account]
            transactionName = 'withdraw'
        } else {
            action = 'decreaseETHAndMint'
            params = [collateralAmountInWei, unitAmountInWei, account]
            transactionName = 'withdraw-mint'
        }
    }

    //TODO: estimate the gas
    const gasLimit = 0;

    const confirm = async () => {

        if (!action) {
            toast.error(t('action-not-supported'));
            return;
        }
        const callTransaction = await buildTx({
            publicClient,
            walletClient: walletClient,
            account,
            contract: network!.RouterV1,
            args: params,
            value: msgValue,
            functionName: action,
            errMsg: t('cannot-send-transaction')
        })

        if (callTransaction) {
            const txId = await sendTx({
                name: transactionName.startsWith('deposit') || transactionName.startsWith('withdraw') ? 
                        t(transactionName, {symbol: collateral}) : t(transactionName),
                callTransaction: callTransaction as WriteResponse,
                callbacks: {
                  onSuccess: (id) => {
                    reset()
                  }
                }
            })
            setTxId(txId);
        }

    }

    return <>
        <TxButton txId={txId}  onClick={confirm}>
            { isManage ? t('update') : t('create')}
        </TxButton>
        {Boolean(gasLimit) && Boolean(gasPrice) && (
            <div className='flex justify-between text-gray text-sm mt-2'>
                <div>{t('estimated-gas')}:</div>
                <div>Ø{(gasLimit * gasPrice).toFixed(3)}</div>
            </div>
        )}
    </>
}