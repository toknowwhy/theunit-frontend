'use client';

import { useVaultTranslations } from '@/crypto/hooks/useVaultTranslations';
import VaultInfoTitle from './VaultInfoTitle';

export default function VaultInfoBox({
  title,
  info,
  value,
  extraValue,
} : {
  title: string;
  info?: string;
  value: number | string;
  extraValue?: number | string;
}) {
  const t = useVaultTranslations();
  return <div className="min-h-[88px]">
    <VaultInfoTitle title={t(title)} info={info ? t(info) : undefined} />
    <div className="font-bold text-3xl my-1">{value}</div>
    <div className="text-xs text-primary">
      {extraValue} {t('after')}
    </div>
  </div>;
}
