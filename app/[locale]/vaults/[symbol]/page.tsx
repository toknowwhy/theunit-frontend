import ManageVault from '@/components/vaults/ManageVault';
import { VAULT_COLLATERAL_ACTIONS, VAULT_UNIT_ACTIONS } from '@/app/constants';
import { useTranslations } from 'next-intl';
import { getTranslations } from '@/app/utils';
import { Dictionary } from 'ts-essentials';
import * as VaultMessages from '@/messages/en.json';
import { Suspense } from 'react';

export default function ManageVaultPage({
    params,
  }: {
    params: { symbol: string };
  }) {
    const symbol = params.symbol;
    const t = useTranslations('Vault');
    const specialKeys = ['deposit', 'withdraw'];
    const allKeys = Object.keys(VaultMessages.Vault).filter((k) => specialKeys.indexOf(k) == -1);
    


    const translations: Dictionary<string> = {
      ...getTranslations(allKeys, t),
      ...getTranslations(VAULT_UNIT_ACTIONS, t),
      create: t('create'),
      manage: t('manage'),
      info: t('info'),
      update: t('update'),
    }
    for (let i=0; i<VAULT_COLLATERAL_ACTIONS.length; i++) {
      translations[VAULT_COLLATERAL_ACTIONS[i]] = t(VAULT_COLLATERAL_ACTIONS[i], {symbol});
    }

    return <Suspense fallback={<>loading...</>}>
        <ManageVault translations={translations} symbol={symbol} />
    </Suspense>
}