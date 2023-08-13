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


  return <div className="min-h-[88px] border-gray-border first:pl-0 last:pr-0 px-4 sm:pr-6 sm:pl-11 group-[.above]:pb-6 group-[.below]:pt-6 sm:group-[.above]:pb-10 sm:group-[.below]:pt-10">
    <VaultInfoTitle title={t(title)} info={info ? t(info) : undefined} />
    <div className="font-bold text-base sm:text-2xl my-1 text-ellipsis overflow-hidden">{addSuffix(value)}</div>
    {extraValue !== undefined && extraValue !== null && <div className="inline-block text-ellipsis overflow-hidden text-base text-gradient group-[.has-error]:text-error">
      {addSuffix(extraValue)} {t('after')}
    </div>}
  </div>;
}
