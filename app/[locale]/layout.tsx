import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import localFont from '@next/font/local';
import Providers from '../providers';
import MainLayout from '@/components/navbar/MainLayout';
import '@/styles/global.css';
import { ServerThemeProvider } from '@wits/next-themes';

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
    <ServerThemeProvider defaultTheme = 'dark'>
      <html lang={locale} className={avenirFont.className}>
        <head />
        <body className="text-lg text-text m-0 bg-black-light">
            <Providers>
              <MainLayout>
                {children}
              </MainLayout>
            </Providers>
        </body>
      </html>
    </ServerThemeProvider>
  )
}
