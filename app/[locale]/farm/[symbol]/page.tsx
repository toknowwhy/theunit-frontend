import { NextIntlClientProvider, useLocale } from 'next-intl';
import { pick } from 'lodash';
import Farm from '@/components/farm/Farm';

export default async function FarmPage({
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
              <Farm symbol={symbol} />
           </NextIntlClientProvider>
}