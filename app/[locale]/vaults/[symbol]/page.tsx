import ManageVault from '@/components/vaults/ManageVault';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { pick } from 'lodash';
import BodyContainer from '@/components/navbar/BodyContainer';
import VaultNetworkProvider from '@/components/vaults/VaultNetworkProvider';

export default async function ManageVaultPage() {
    const locale = useLocale();
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return <NextIntlClientProvider
              locale={locale}
              messages={pick(messages, 'Vault')}
            >
              <BodyContainer hasBgd>
                <VaultNetworkProvider>
                  <ManageVault />
                </VaultNetworkProvider>
              </BodyContainer>
           </NextIntlClientProvider>
}