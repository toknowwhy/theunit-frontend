import BodyContainer from "@/components/navbar/BodyContainer";
import ClaimInfo from "@/components/tokens/ClaimInfo";
import { useTranslations } from "next-intl";

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