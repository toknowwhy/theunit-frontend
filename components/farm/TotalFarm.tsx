'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { FarmBoxProps } from "@/utils/types";
import FarmBox from "./FarmBox";

export default function TotalFarm(props: FarmBoxProps) {

    const { unToTinuPrice, totalRewards, accessibleRewards } = props;

    const t = useVaultTranslations()

    return (
        <FarmBox>
            <div className="font-semibold text-3xl mb-4">
                {t('total-farm')}
            </div>
        </FarmBox>

    )
}