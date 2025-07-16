import './globals.css';

//Googleアナリティクスの設定
import { GoogleAnalytics } from '@next/third-parties/google';

//Googleタグマネージャーの設定
import { GoogleTagManager } from '@next/third-parties/google';

//メタデータの共通化
import type { Metadata } from 'next';

import Header from './_components/Header';
import Footer from './_components/Footer';

//以下メタデータ情報
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    //下部ページでは「 %s 」の部分にそれぞれのページで設定したタイトルが入る
    template: '%s | シンプルなコーポレートサイト',
    default: 'シンプルなコーポレートサイト',
  },
  description:
    '「Next.js+ヘッドレスCMSではじめる！かんたん・モダンWEBサイト制作入門」で作成されるサイトです。',
  openGraph: {
    title: ' シンプルなコーポレートサイト',
    description:
      '「Next.js+ヘッドレスCMSではじめる！かんたん・モダンWEBサイト制作入門」で作成されるサイトです。',
    images: ['/ogp.png'],
  },
  alternates: {
    canonical: 'http://localhost:3000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>

      <GoogleAnalytics gaId="○○○" />
      <GoogleTagManager gtmId="GTN-○○○" />
    </html>
  );
}
