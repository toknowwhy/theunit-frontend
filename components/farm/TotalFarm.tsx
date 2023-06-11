'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { FarmBoxProps } from "@/utils/types";
import Button from "../button/Button";
import FarmBox from "./FarmBox";
import FarmInfo from "./FarmInfo";

export default function TotalFarm(props: FarmBoxProps) {

    const { unToTinuPrice, totalRewards, accessibleRewards } = props;

    const t = useVaultTranslations()

    return (
        <FarmBox>
            <div className="flex flex-col justify-between h-full">
                <div className="font-semibold text-3xl">
                    {t('total-farm')}
                </div>
                <div className="flex justify-center items-center gap-20 border-y border-y-gray-border py-10">
                    <FarmInfo 
                        title={t('total-rewards')}
                        value={totalRewards}
                        price={unToTinuPrice}
                    />
                    <div className="w-[1px] h-16 bg-gray-border flex-none" />
                    <FarmInfo 
                        title={t('accessible-rewards')}
                        value={accessibleRewards}
                        price={unToTinuPrice}
                    />
                </div>
                <div className="flex gap-6">
                    <Button>
                        {t('claim')}
                    </Button>
                    <Button>
                        {t('compound')}
                    </Button>
                </div>
            </div>
        </FarmBox>

    )
}