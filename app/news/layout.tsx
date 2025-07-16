import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

//以下メタタイトル設定
export const metadata = {
  title: 'ニュース',
};

type Props = {
  children: React.ReactNode;
};

//キャッシュ保存期間を60にする。「 news/layout.tsx 」に記載することによって以下の階層すべてに反映される。
export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
