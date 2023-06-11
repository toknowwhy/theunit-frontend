'use client'

import { LockLP, LPBoxProps } from "@/utils/types";
import Image from "next/image";
import FarmBox from "./FarmBox";
import eth from "@/public/icons/eth.svg"
import { useVaultTranslations } from "@/utils/hooks/useVaultTranslations";
import FarmInfo from "./FarmInfo";
import Button from "../button/Button";

export default function LPBox(props: LPBoxProps) {

    const { isUNPool, symbol, ethLP, unLP, ethLPLocked, unLPLocked, ethToTinuPrice, unToTinuPrice } = props;
    const t = useVaultTranslations();

    const price = isUNPool ? unToTinuPrice : ethToTinuPrice;
    const locked = isUNPool ? unLPLocked : ethLPLocked;
    const accessible = isUNPool ? unLP : ethLP;

    return (
        <FarmBox>
            <div className="mb-6 flex items-center gap-3 text-3xl font-semibold">
                <Image src={eth} alt='eth' />
                {isUNPool ? 'UN/TINU' : `${symbol}/TINU`} {t('lp-tokens')}
            </div>
            <div className="flex gap-20 mb-8">
                <div className="flex-none flex flex-col gap-4">
                    <FarmInfo 
                        title={t('locked')} 
                        value={locked} 
                        price={locked * price} 
                    />
                    <FarmInfo 
                        title={t('accessible')} 
                        value={accessible} 
                        price={accessible * price} 
                    />
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between text-gray">
                        <div>{t('amount')}</div>
                        <div>{t('locked-days')}</div>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <Button>
                    {t('withdraw-word')}
                </Button>
                <Button>
                    {t('deposit-word')}
                </Button>
                <Button>
                    {t('relock')}
                </Button>
            </div>
        </FarmBox>
    )
}