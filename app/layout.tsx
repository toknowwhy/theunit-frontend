import localFont from '@next/font/local';
import '@/styles/global.scss';
import Header from '@/components/navbar/Header';
import WalletProvider from './wallet';

const avenirFont = localFont({
  src: [
    {
      path: '../styles/fonts/Avenir-Black.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Avenir-Book.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/Avenir-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={avenirFont.className}>
      <head />
      <body>
        <WalletProvider>
          <Header />
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
