import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { pick } from 'lodash';
import { ReactNode } from 'react';
import BodyContainer from '@/components/navbar/BodyContainer';

export default function ClientSideLayout({ children } : { children: ReactNode }) {
    const locale = useLocale();
    const messages = useMessages();

    <NextIntlClientProvider
        locale={locale}
        messages={pick(messages!, 'Vault')}
    >
        <BodyContainer hasBgd>
            { children }
        </BodyContainer>
    </NextIntlClientProvider>
}