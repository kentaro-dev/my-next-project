// import styles from "./page.module.css";
import Sheet from '@/app/_components/Sheet';
import Hero from '@/app/_components/Hero';

//以下メタタイトル設定
export const metadata = {
  title: 'メンバー',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Member" sub="メンバー" />
      <Sheet>{children}</Sheet>;
    </>
  );
}
