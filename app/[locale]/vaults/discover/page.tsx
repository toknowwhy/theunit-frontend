import BodyContainer from "@/components/navbar/BodyContainer";
import DiscoverList from "@/components/vaults/discover/DiscoverList";
import { supportedNetworks } from "@/crypto/config";
import { coinLogoUrl } from "@/utils/functions";
import { DiscoverRank, TabItem } from "@/utils/types";
import { useTranslations } from "next-intl";

export default function DiscoverPage() {
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

    const networkItems: TabItem<string>[] = Object.keys(supportedNetworks).map((sn) => ({
        value: sn,
        title: supportedNetworks[sn].nativeSymbol,
        icon: coinLogoUrl(supportedNetworks[sn].unitId)
    }))

    const headers = [
        t('vault'),
        t('liquidation-price'),
        t('next-price'),
        t('tinu-debt'),
        t('status'),
        t('action'),
    ]

    return <BodyContainer>
        <div className="font-bold text-4xl">
            {t('vault-list')}
        </div>
        <DiscoverList 
            tabs={rankTabs} 
            headers={headers} 
            networks={networkItems}
        />
    </BodyContainer>
}