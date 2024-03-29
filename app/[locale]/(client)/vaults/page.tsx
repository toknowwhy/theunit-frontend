import BodyContainer from "@/components/navbar/BodyContainer";
import VaultTabs from "@/components/vaults/VaultTabs";
import { TabItem, DiscoverRank } from "@/utils/types";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
    title: 'UNIT\'s ETF DeFi vaults'
}

export default function VaultsPage() {

    const t = useTranslations('Vault')
    
    const rankTabs: TabItem<DiscoverRank>[] = [
        {
            title: t('highest-risk'),
            value: 'risk'
        },
        {
            title: t('largest-debt'),
            value: 'debt'
        }
    ]

    const headers = [
        t('owner'),
        t('liquidation-price'),
        t('next-price'),
        t('tinu-debt'),
        t('status'),
        t('action'),
    ]

    return (
        <BodyContainer>
            <VaultTabs 
                tabs={rankTabs} 
                headers={headers} 
                viewText={t('view')}
                untilText={t('until-liquidate')}
                vaultListTitle={t('vault-list')}
                vaultTitle={t('vault')}
            />
        </BodyContainer>
    )
}
