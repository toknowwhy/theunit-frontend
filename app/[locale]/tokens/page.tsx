import BodyContainer from "@/components/navbar/BodyContainer";
import ClaimInfo from "@/components/tokens/ClaimInfo";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
    title: 'UN Token Claim',
    description: 'UN Token Ticket holders can claim UN tokens here'
}

export default function TokenClaim() {

    const t = useTranslations('Tokens');


    return (
        <BodyContainer>
            <div className="text-4xl font-bold">{t('token-claim')}</div>
            <div className="text-gray">{t('claim-tips')}</div>

            <ClaimInfo />
        </BodyContainer>
    )
}