'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { useState } from "react";
import FarmBox from "./FarmBox";

export default function FarmForm({
    symbol,
} : {
    symbol: string,
}) {

    const t = useVaultTranslations()

    const [ethAmount, setEthAmount] = useState('')
    const ethValue = parseFloat(ethAmount);
    

    return (
        <FarmBox>
            <div className="font-semibold text-2xl">
                {t('lock-to-earn', {symbol})}
            </div>
        </FarmBox>
    )
}