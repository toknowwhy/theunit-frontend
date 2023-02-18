'use client';

import { useSupportedCollaterals } from "@/crypto/hooks/useSupportedCollaterals";
import { TokenDesc } from "@/crypto/types";
import VaultType from "./VaultType";

export default function VaultTypeList({isStable=true}: {isStable?: boolean}) {
    
    const supportedCollaterals = useSupportedCollaterals();
    
    return <div className="flex flex-col gap-8">
        {supportedCollaterals
            .filter((col: TokenDesc) => col.stable == isStable)
            .map((l) => <VaultType key={l.coinId} coin={l} />)
        }
    </div>
}