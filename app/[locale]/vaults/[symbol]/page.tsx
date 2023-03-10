import ManageVault from '@/components/vaults/ManageVault';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { pick } from 'lodash';

export default async function ManageVaultPage({
    params,
  }: {
    params: { symbol: string };
  }) {
    const symbol = params.symbol;
    const locale = useLocale();
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return <NextIntlClientProvider
              locale={locale}
              messages={pick(messages, 'Vault')}
            >
              <ManageVault symbol={symbol} />
           </NextIntlClientProvider>
}