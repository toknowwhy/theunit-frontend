'use client'

import BoxContainer from "@/components/BoxContainer";
import SplineAnim from "@/components/SplineAnim";
import { supportedNetworks } from "@/crypto/config";
import {  CollateralInfo, NetworkConfig } from "@/utils/types";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useContracts } from "./VaultNetworkProvider";
import Spinner from "../Spinner";

export default function VaultsSelect({
    isFarm = false,
} : {
    isFarm?: boolean,
}) {
    const contracts = useContracts();
    const networkInfo = contracts ? supportedNetworks[contracts.id] : undefined;
    const supportedCollaterals = networkInfo?.supportedCollaterals ?? [];

    if (!networkInfo) {
        return <Spinner />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 2xl:grid-cols-3 2xl:gap-4">
            <VaultChoice choiceInfo={networkInfo} isFarm={isFarm} />
            {supportedCollaterals.map((collateral) => (
                <VaultChoice
                    key={collateral.symbol}
                    choiceInfo={collateral}
                    isFarm={isFarm}
                />
            ))}
        </div>
    )
}

function VaultChoice({
    choiceInfo,
    isFarm,
} : {
    choiceInfo: CollateralInfo,
    isFarm: boolean,
}) {
    const t = useTranslations('Vault');
    const symbol = choiceInfo.symbol;

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="flex justify-between items-center mb-8 gap-8">
                    <div>
                        <div className="text-4xl font-semibold">
                            {symbol}-TINU
                        </div>
                        <div className="text-gray-medium leading-5">{t(choiceInfo.unitId+'-vault-description')}</div>
                    </div>
                    <div className="w-24 h-28 flex items-center justify-center">
                        <SplineAnim url={choiceInfo.splineLogo} />
                    </div>
                </div>
                <VaultChoiceInfo title={t('unit-limit')} info={choiceInfo.dustLimit.toString()} />
                <VaultChoiceInfo title={t('liquidation-ratio')} info={(choiceInfo.liquidationRatio * 100).toFixed(0) + '%'} />
                <VaultChoiceInfo title={t('stability-fee')} info='0.00%' />
                <Link 
                    href={`/${isFarm ? 'farm' : 'vaults'}/${choiceInfo.unitId}`} 
                    className="block mt-8 py-3 rounded-lg bg-gray-border text-center font-semibold hover:bg-transparent border border-gray-border" 
                >
                        {t(isFarm ? 'start-farm' : 'enter-vault')}
                </Link>
            </div>
        </BoxContainer>
    )
}

function VaultChoiceInfo({
    title,
    info,
} : {
    title: string,
    info: string,
}) {
    return (
        <div className="flex items-center justify-between mb-2">
            <div className="text-gray-medium">{title}</div>
            <div>{info}</div>
        </div>
    )
}
