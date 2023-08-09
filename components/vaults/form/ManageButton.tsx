import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { usePublicClient, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TxButton from "@/components/web3/TxButton";
import { VaultButtonProps, WriteResponse } from "@/utils/types";
import { ContractFunc } from "@/utils/types";
import { useVaultContracts } from "../VaultNetworkProvider";
import { formatEther, parseEther } from "viem";
import buildTx from "@/utils/buildTx";

export default function ConfirmBtn({ 
    collateral, 
    account: wallet, 
    owner,
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
    const [preparing, setPreparing] = useState(false);
    const [gas, setGas] = useState<number>(0);
    const sendTx = useTx();
    const network = useVaultContracts();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient()

    const account = owner ?? wallet;

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

    useEffect(() => {
        (async function estimateGas() {
            if (action) {
                const gas = await publicClient.estimateContractGas({
                    account: wallet!,
                    ...network!.RouterV1,
                    functionName: action,
                    args: params,
                    value: msgValue ? parseEther(msgValue.toString()) : undefined
                })
                setGas(parseFloat(formatEther(gas)))
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action, collateralAmountInWei, unitAmountInWei])

    const confirm = async () => {

        if (!action) {
            toast.error(t('action-not-supported'));
            return;
        }
        setPreparing(true)
        const callTransaction = await buildTx({
            publicClient,
            walletClient: walletClient,
            account: wallet,
            contract: network!.RouterV1,
            args: params,
            value: msgValue,
            functionName: action,
            errMsg: t('cannot-send-transaction')
        })
        setPreparing(false)

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
        <TxButton txId={txId}  onClick={confirm} loading={preparing}>
            { isManage ? t('update') : t('create')}
        </TxButton>
        {Boolean(gasPrice) && Boolean(gas) && (
            <div className='flex justify-between text-gray text-sm mt-2'>
                <div>{t('estimated-gas')}:</div>
                <div>Ø{(gasPrice * gas).toFixed(8)}</div>
            </div>
        )}
    </>
}