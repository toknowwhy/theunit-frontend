'use client'

import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import FarmForm from "./FarmForm";

export default function Farm({symbol} : {symbol: string}) {

    const t = useVaultTranslations();

    return <>
        <div className="font-bold text-4xl mb-10">
            {symbol} {t('farm')}
        </div>

        <div className="grid grid-cols-2">
            <FarmForm symbol={symbol} />
        </div>
    </>
}