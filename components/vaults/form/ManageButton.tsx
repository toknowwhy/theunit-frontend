"use client"

import { useCurrentNetwork } from "@/utils/hooks/useCurrentNetwork";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { parseEther, parseUnits } from "ethers/lib/utils.js";
import { useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import { toast } from "react-toastify";
import TxButton from "@/components/web3/TxButton";
import { VaultButtonProps } from "./VaultButton";
import { ContractFunc } from "@/utils/types";

export default function ConfirmBtn({ 
    collateral, 
    account, 
    collateralAmount, 
    isManage, 
    unitAmount,
    reset, 
} : VaultButtonProps) {
    const t = useVaultTranslations();
    const [txId, setTxId] = useState('');
    const sendTx = useTx();

    const { refetch: getSigner } = useSigner();
    const network = useCurrentNetwork();
    const isETH = collateral.symbol === 'ETH';

    const confirm = async () => {
        if (!isETH) {
            toast.error(t('collateral-not-supported', {symbol: collateral.symbol}));
            return;
        }
        const { data: signer } = await getSigner()
        let action: ContractFunc|undefined;
        let params: any[] = [];
        let msgValue: number = 0;
        let transactionName: string = '';
        if (collateralAmount > 0) {
            if (unitAmount > 0) {
                action = 'increaseETHAndMint'
                params = [unitAmount, account]
                transactionName = 'deposit-mint'
            } else if (unitAmount == 0) {
                action = 'increaseCollateralETH'
                params = [account]
                transactionName = 'deposit'
            }
            msgValue = collateralAmount;
        } else if (collateralAmount == 0) {
            if (unitAmount > 0) {
                action = 'increaseETHAndMint'
                params = [unitAmount, account]
                transactionName = 'mint'
            } else if (unitAmount < 0) {
                action = 'decreaseETHAndBurn'
                params = [0, -unitAmount, account]
                transactionName = 'burn'
            }
        } else {
            if (unitAmount < 0) {
                action = 'decreaseETHAndBurn'
                params = [-collateralAmount, -unitAmount, account]
                transactionName = 'withdraw-burn'
            } else if (unitAmount == 0) {
                action = 'decreaseCollateralETH'
                params = [-collateralAmount, account]
                transactionName = 'withdraw'
            }
        }

        if (!action) {
            toast.error(t('action-not-supported'));
            return;
        }

        params.push({
            gasLimit: 120000,
            value: parseEther(msgValue.toString())
        })

        const callTransaction = buildTx(
            network.unitRouter, 
            action,
            signer!,
            params
        );
        const txId = await sendTx({
            name: transactionName.startsWith('deposit') || transactionName.startsWith('withdraw') ? 
                    t(transactionName, {symbol: collateral.symbol}) : t(transactionName),
            callTransaction,
            callbacks: {
              onSuccess: (id) => {
                reset()
              }
            }
        })
        setTxId(txId);
    }

    return <TxButton txId={txId}  onClick={confirm}>
        { isManage ? t('update') : t('create')}
    </TxButton>
}