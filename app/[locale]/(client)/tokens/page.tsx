import ClaimInfo from "@/components/tokens/ClaimInfo";
import VaultNetworkProvider from "@/components/vaults/VaultNetworkProvider";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
    title: 'UN Token Claim',
    description: 'UN Token Ticket holders can claim UN tokens here'
}

export default function TokenClaim() {

    const t = useVaultTranslations();


    return (
        <>
            <div className="text-4xl font-bold">{t('token-claim')}</div>
            <div className="text-gray">{t('claim-tips')}</div>

            <VaultNetworkProvider>
                <ClaimInfo />
            </VaultNetworkProvider>
        </>
    )
}