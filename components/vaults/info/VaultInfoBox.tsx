'use client';

import { useVaultTranslations } from '@/utils/hooks/useVaultTranslations';
import VaultInfoTitle from './VaultInfoTitle';

export interface VaultInfoBoxProps {
  title: string;
  info?: string;
  value: number | string;
  extraValue?: number | string;
}

export default function VaultInfoBox({
  title,
  info,
  value,
  extraValue,
} : VaultInfoBoxProps) {
  const t = useVaultTranslations();
  return <div className="min-h-[88px]">
    <VaultInfoTitle title={t(title)} info={info ? t(info) : undefined} />
    <div className="font-bold text-3xl my-1">{value}</div>
    {extraValue !== undefined && extraValue !== null && <div className="text-xs text-primary group-[.has-error]:text-red">
      {extraValue} {t('after')}
    </div>}
  </div>;
}
