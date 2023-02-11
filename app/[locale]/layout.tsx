import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import localFont from '@next/font/local';
import '@/styles/global.scss';
import WalletProvider from '../context/wallet';
import MainLayout from '@/components/navbar/MainLayout';

const avenirFont = localFont({
  src: [
    {
      path: '../../styles/fonts/Avenir-Black.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Avenir-Book.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../styles/fonts/Avenir-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode,
  params: {locale: string}
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className={avenirFont.className}>
      <head />
      <body>
        <WalletProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </WalletProvider>
      </body>
    </html>
  )
}
