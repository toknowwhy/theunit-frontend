import ManageVault from '@/components/vaults/ManageVault';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { pick } from 'lodash';
import BodyContainer from '@/components/navbar/BodyContainer';

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
              <BodyContainer hasBgd>
                <ManageVault symbol={symbol} />
              </BodyContainer>
           </NextIntlClientProvider>
}