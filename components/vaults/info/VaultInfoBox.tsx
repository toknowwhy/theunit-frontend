'use client';

import { numberWithCommas } from '@/utils/functions';
import { useVaultTranslations } from '@/utils/hooks/useVaultTranslations';
import VaultInfoTitle from './VaultInfoTitle';

export interface VaultInfoBoxProps {
  title: string;
  info?: string;
  value: number | string;
  extraValue?: number | string;
  suffix?: string;
}

export default function VaultInfoBox({
  title,
  info,
  value,
  extraValue,
  suffix,
} : VaultInfoBoxProps) {
  const t = useVaultTranslations();

  const addSuffix = (val: string|number) => {
    if (typeof val === 'string') {
      return val;
    }
    let res = '';
    if (!suffix) {
      res += 'Ø'
    }
    res += numberWithCommas((val as number).toFixed(3));
    if (suffix) {
      res += suffix;
    }
    return res;
  }


  return <div className="min-h-[88px]">
    <VaultInfoTitle title={t(title)} info={info ? t(info) : undefined} />
    <div className="font-bold text-2xl my-1">{addSuffix(value)}</div>
    {extraValue !== undefined && extraValue !== null && <div className="text-xs text-primary group-[.has-error]:text-red">
      {addSuffix(extraValue)} {t('after')}
    </div>}
  </div>;
}
