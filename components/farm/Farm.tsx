'use client'

import { useCurrentNetworkContracts } from "@/utils/hooks/useCurrentNetwork";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { FarmBoxProps, LockLP } from "@/utils/types";
import { useAccount } from "wagmi";
import FarmForm from "./FarmForm";
import LPBox from "./LPBox";
import TotalFarm from "./TotalFarm";

export default function Farm({symbol} : {symbol: string}) {

    const t = useVaultTranslations();

    const networkInfo = useCurrentNetworkContracts();
    const { address } = useAccount();


    const ethToTinuPrice = 1280;
    const ethToUnPrice = 20000;
    const unToTinuPrice = 0.05;
    const totalRewards = 0;
    const accessibleRewards = 0;
    const ethLP = 0;
    const unLP = 0;
    const ethLPLocked = 0;
    const unLPLocked = 0;
    const ethLockedLPs: LockLP[] = [];
    const unLockedLPs: LockLP[] = [];
    const farmProps: FarmBoxProps = {
        ethToTinuPrice,
        ethToUnPrice,
        unToTinuPrice,
        totalRewards,
        accessibleRewards,
        ethLP,
        unLP,
        ethLPLocked,
        unLPLocked,
        ethLockedLPs,
        unLockedLPs,
        collateral: networkInfo?.nativeSymbol ?? 'ETH',
        account: address,
    }

    return <>
        <div className="font-bold text-4xl mb-10">
            {symbol} {t('farm')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-10">
            <FarmForm {...farmProps} />
            <TotalFarm {...farmProps} />
            <LPBox {...farmProps} isUNPool />
            <LPBox {...farmProps} isUNPool={false} />
        </div>
    </>
}