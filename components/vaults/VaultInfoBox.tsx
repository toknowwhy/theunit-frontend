'use client';

import { useVaultTranslations } from '@/crypto/hooks/useVaultTranslations';
import VaultInfoTitle from './VaultInfoTitle';

export default function VaultInfoBox({
  title,
  info,
  value,
  extraValue,
  unit,
} : {
  title: string;
  info?: string;
  value: number;
  extraValue?: number;
  unit?: string;
}) {
  const t = useVaultTranslations();
  let val = null;
  if (extraValue && !isNaN(extraValue)) {
    if (unit === undefined) {
      val = 'Ø' + extraValue;
    } else if (unit === '%') {
      val = (extraValue! * 100).toFixed(2) + '%';
    } else {
      val = `${extraValue} ${unit}`;
    }
  }
  return <div className="min-h-[88px]">
    <VaultInfoTitle title={t(title)} info={info ? t(info) : undefined} />
    <div className="font-bold text-3xl my-1">{value}</div>
    {val && <div className="text-xs text-primary">
                                            {val} {t('after')}
                                         </div>}
  </div>;
}
