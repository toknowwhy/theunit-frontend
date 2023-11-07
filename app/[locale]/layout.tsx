import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import { Metadata } from 'next';
import localFont from '@next/font/local';
import Providers from '../providers';
import MainLayout from '@/components/navbar/MainLayout';
import '@/styles/global.css';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/utils/constants';


export const metadata: Metadata = {
  title: SITE_TITLE,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Unit Index App',
    images: [
      {
        url: '/og.jpg',
        width: 816,
        height: 510,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: '@unit_index',
    creator: '@IbaiBasabe',
    images: ['/og.jpg'],
  },
}

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
    <html suppressHydrationWarning lang={locale} className={avenirFont.className}>
      <head />
      <body className="text-lg text-text m-0 bg-black-light">
          <Providers 
            walletConnectId={process.env.WALLET_CONNECT_ID ?? ''} 
            infuraKey={process.env.INFURA_PROJECT_ID ?? ''}
            alchemyKey={process.env.ALCHEMY_KEY ?? ''}
          >
            <MainLayout>
              {children}
            </MainLayout>
          </Providers>
      </body>
    </html>
  )
}
