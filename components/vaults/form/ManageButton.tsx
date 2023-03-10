"use client"

import { useCurrentNetwork } from "@/utils/hooks/useCurrentNetwork";
import { useTx } from "@/utils/hooks/useTx";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { parseEther, parseUnits } from "ethers/lib/utils.js";
import { useSigner } from "wagmi";
import { useState } from "react";
import { buildTx } from "@/utils/buildTx";
import TxButton from "../../web3/TxButton";
import { VaultButtonProps } from "./VaultButton";

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

    const confirm = async () => {
        const { data: signer } = await getSigner()
        const isDeposit = collateralAmount > 0;
        const callTransaction = isDeposit ? buildTx(
            network.unitRouter, 
            "increaseCollateral", 
            signer!,
            [collateral.address, parseUnits(`${collateralAmount}`, collateral.decimals),  account]
        ) : buildTx(
            network.vault, 
            "decreaseCollateral", 
            signer!,
            [account, parseUnits(`${collateralAmount}`, collateral.decimals),  collateral.address]
        )
        const txId = await sendTx({
            name: t('deposit', {symbol: collateral.symbol}),
            callTransaction,
            callbacks: {
              onSuccess: () => {
                if (unitAmount != 0) {
                    mint();
                } else {
                    reset();
                }
              }
            }
        })
        setTxId(txId);
    }

    const mint = async () => {
        const { data: signer } = await getSigner()
        const callTransaction = buildTx(
            network.unitToken, 
            unitAmount > 0 ? "mint" : "burn", 
            signer!,
            [account, parseEther(`${unitAmount}`), collateral.address]
        )
        const txId = await sendTx({
            name: t('mint'),
            callTransaction,
            callbacks: {
              onSuccess: reset,
              onError: () => {
                if (collateralAmount != 0) {
                    reset();
                }
              }
            }
        })
        setTxId(txId);
    }

    const onClick = () => {
        if (collateralAmount == 0) {
            mint();
        } else {
            confirm();
        }
    }

    return <TxButton txId={txId}  onClick={onClick}>
        { isManage ? t('update') : t('create')}
    </TxButton>
}