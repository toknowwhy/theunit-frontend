import PriceRow from '@/components/vaults/PriceRow';
import VaultForm from '@/components/vaults/VaultForm';
import VaultHeader from '@/components/vaults/VaultHeader';
import { VAULT_COLLATERAL_ACTIONS, VAULT_UNIT_ACTIONS } from '@/helpers/constants';
import { getCoinFromSymbol, getTranslations } from '@/helpers/utils';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

export default function ManageVaultPage({
    params,
  }: {
    params: { symbol: string };
  }) {
    const t = useTranslations('Vault');

    const symbol = params.symbol;
    const coin = getCoinFromSymbol(symbol);
    if (coin == null) {
        return notFound();
    }

    let res: Record<string, string> = {};
    for (let i=0; i<VAULT_COLLATERAL_ACTIONS.length; i++) {
        res[VAULT_COLLATERAL_ACTIONS[i]] = t(VAULT_COLLATERAL_ACTIONS[i], {symbol});
    }
    const translations = getTranslations(VAULT_UNIT_ACTIONS, t); 
    res = {
      ...res,
      ...translations,
      create: t('create'),
      manage: t('manage'),
      info: t('info'),
      update: t('update'),
    }

    return <>
        <VaultHeader coin={coin} />
        <PriceRow />
        <VaultForm 
          symbol={symbol}
          translations={res}
        />
    </>
}