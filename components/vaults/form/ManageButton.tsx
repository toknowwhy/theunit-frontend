import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { parseEther, parseUnits } from "ethers/lib/utils.js";
import { usePrepareContractWrite, useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import { toast } from "react-toastify";
import TxButton from "@/components/web3/TxButton";
import { VaultButtonProps } from "@/utils/types";
import { ContractFunc } from "@/utils/types";
import { useVaultContracts } from "../VaultNetworkProvider";

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

    const { refetch: getSigner } = useSigner();
    const network = useVaultContracts();

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

    const { config } = usePrepareContractWrite({
        ...network!.RouterV1,
        functionName: action,
        enabled: Boolean(action),
        args: params
    })
    const gasLimit = config?.request?.gasLimit.toNumber() ?? 0;

    const confirm = async () => {
        const { data: signer } = await getSigner()

        if (!action) {
            toast.error(t('action-not-supported'));
            return;
        }

        params.push({
            gasLimit: gasLimit ? gasLimit : 800000,
            value: parseEther(msgValue.toString())
        })

        const callTransaction = buildTx(
            network!.RouterV1, 
            action,
            signer!,
            params
        );
        const txId = await sendTx({
            name: transactionName.startsWith('deposit') || transactionName.startsWith('withdraw') ? 
                    t(transactionName, {symbol: collateral}) : t(transactionName),
            callTransaction,
            callbacks: {
              onSuccess: (id) => {
                reset()
              }
            }
        })
        setTxId(txId);
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