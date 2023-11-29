import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { pick } from 'lodash';
import { ReactNode } from 'react';
import BodyContainer from '@/components/navbar/BodyContainer';
import { ToastContainer } from 'react-toastify';

export default function ClientSideLayout({ children } : { children: ReactNode }) {
    const locale = useLocale();
    const messages = useMessages();

    return <NextIntlClientProvider
        locale={locale}
        messages={pick(messages!, 'Vault')}
    >
        <BodyContainer hasBgd>
            { children }
        </BodyContainer>
        <ToastContainer 
            position="top-right"
            theme='dark'
            className='max-w-full'
        />
    </NextIntlClientProvider>
}