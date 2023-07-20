import BoxContainer from "@/components/BoxContainer";
import SplineAnim from "@/components/SplineAnim";
import { allNetworkContracts, networkConigs, supportedNetworks } from "@/crypto/config";
import { coinLogoUrl } from "@/utils/functions";
import {  NetworkContracts } from "@/utils/types";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";
import { Chain } from "wagmi";

export default function VaultsSelect({
    isFarm = false,
} : {
    isFarm?: boolean,
}) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 2xl:grid-cols-3 2xl:gap-4">
            {supportedNetworks.map((chain) => (
                <VaultChoice
                    key={chain.id}
                    chain={chain}
                    contracts={allNetworkContracts[chain.id]}
                    isFarm={isFarm}
                />
            ))}
        </div>
    )
}

function VaultChoice({
    chain,
    contracts,
    isFarm,
} : {
    chain: Chain,
    contracts: NetworkContracts,
    isFarm: boolean,
}) {
    const t = useTranslations('Vault');
    const symbol = chain.nativeCurrency.symbol;
    const networkConfig = networkConigs[chain.id];

    return (
        <BoxContainer>
            <div className="p-10">
                <div className="flex justify-between items-center mb-8 gap-8">
                    <div>
                        <div className="text-4xl font-semibold">
                            {symbol}-TINU
                        </div>
                        <div className="text-gray-medium leading-5">{t(networkConfig.unitId+'-vault-description')}</div>
                    </div>
                    <div className="w-24 h-28 flex items-center justify-center">
                        {(symbol === 'ETH' || symbol === 'SEP') ? (
                            <SplineAnim url="https://prod.spline.design/2XUmnjtG8jRU4zPR/scene.splinecode"  />
                        ) : (
                            <Image src={coinLogoUrl(networkConfig.unitId)} width={60} height={60} alt={symbol} />
                        )}
                    </div>
                </div>
                <VaultChoiceInfo title={t('unit-limit')} info={networkConfig.dustLimit.toString()} />
                <VaultChoiceInfo title={t('liquidation-ratio')} info={(networkConfig.liquidationRatio * 100).toFixed(0) + '%'} />
                <VaultChoiceInfo title={t('stability-fee')} info='0.00%' />
                <Link 
                    href={`/${isFarm ? 'farm' : 'vaults'}/${symbol}`} 
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
