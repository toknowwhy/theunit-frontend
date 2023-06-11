'use client'

import { FARM_POOL_TINU_RATIO, FARM_POOL_UN_RATIO, FARM_VAULT_COLLATERAL_RATIO, FARM_VAULT_RATIO } from "@/utils/constants";
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import { FarmBoxProps, LockAPY } from "@/utils/types";
import { useState } from "react";
import Button from "../button/Button";
import FarmBox from "./FarmBox";
import FarmInput from "./FarmInput";
import LockPeriods from "./LockPeriod";
import LPInfo from "./LPInfo";

export default function FarmForm(props: FarmBoxProps) {

    const { ethToTinuPrice, ethToUnPrice, unToTinuPrice, symbol } = props;

    const t = useVaultTranslations()

    const [ethAmount, setEthAmount] = useState('')
    const [period, setPeriod] = useState(6)
    const ethValue = ethAmount ? parseFloat(ethAmount) : 0;
    const ethToOpenVault = ethValue * FARM_VAULT_RATIO;
    const tinuFromVault = ethToOpenVault * FARM_VAULT_COLLATERAL_RATIO * ethToTinuPrice;
    const ethToETHTINUPool = ethValue * FARM_POOL_TINU_RATIO;
    const tinuToETHTINUPool = ethToETHTINUPool * ethToTinuPrice;
    const unToUNTINUPool = ethValue * FARM_POOL_UN_RATIO * ethToUnPrice;
    const tinuToUNTINUPool = tinuFromVault - tinuToETHTINUPool;

    const ethTinuLP = Math.sqrt(ethToETHTINUPool * tinuToETHTINUPool);
    const unTinuLP = Math.sqrt(unToUNTINUPool * tinuToUNTINUPool);

    const ethTinuTotalValue = ethToETHTINUPool * ethToTinuPrice + tinuToETHTINUPool;
    const unTinuTotalValue = unToUNTINUPool * unToTinuPrice + tinuToUNTINUPool;

    const onMax = () => {

    }

    const lockPeriods: LockAPY[] = [
        {
            months: 1,
            apy: 0.0456,
        },
        {
            months: 3,
            apy: 0.0956,
        },
        {
            months: 6,
            apy: 0.2456,
        },
        {
            months: 12,
            apy: 0.5756,
        },
    ]

    return (
        <FarmBox>
            <div className="font-semibold text-3xl mb-4">
                {t('lock-to-earn', {symbol})}
            </div>
            <LPInfo symbol={symbol} lp={ethTinuLP} total={ethTinuTotalValue} />
            <LPInfo symbol="UN" lp={unTinuLP} total={unTinuTotalValue} />

            <div className="h-8"></div>

            <FarmInput 
                value={ethAmount}
                onChange={setEthAmount}
                onMax={onMax}
            />

            <div className="my-8">
                <LockPeriods apys={lockPeriods} selected={period} setSelected={setPeriod} />
            </div>

            <Button>
                {t('lock')}
            </Button>
        </FarmBox>

    )
}