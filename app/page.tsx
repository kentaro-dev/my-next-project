//cssを読み込むための基本設定
import styles from './page.module.css';
//画像データを読み込むための基本設定
import Image from 'next/image';

//ニュースリストのAPIの読み込み
import { getNewsList } from '@/app/_libs/microcms';

//ニュースリストの上限設定の読み込み
import { TOP_NEWS_LIMIT } from '@/app/_constants';

//ニュースリスト部分のパーツ読み込み
import NewsList from '@/app/_components/NewsList';
//ボタン部分のパーツ読み込み
import ButtonLink from '@/app/_components/ButtonLink';

//更新反映を早めるためキャッシュ保存期間を0にする。これによってレンダリング方式がSSRになる。
// export const revalidate = 0;

//キャッシュ保存期間を60にする。これによってレンダリング方式がISRになり、定期的にキャッシュを更新してくれる。
export const revalidate = 60;

//↓↓↓↓↓↓↓↓TOPページでのHTMLの記述箇所↓↓↓↓↓↓↓↓
export default async function Home() {
  //ニュースリスト上限は「TOP_NEWS_LIMIT」を参照してくださいの意
  //「const」は宣言の意
  const date = await getNewsList({
    limit: TOP_NEWS_LIMIT,
  });

  return (
    //↓↓↓↓↓↓↓↓単一のHTMLしか読み込めないので「<>」で囲う↓↓↓↓↓↓↓↓
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>テクノロジーで世界を帰る</h1>
          <p className={styles.description}>
            私たちは市場をリードしているグローバルカンパニーです。
          </p>
        </div>
        {/* 画像は下記のように読み込む。サイズの数字はその比率でウィンドウ幅によって調整してくれる。 */}
        <Image
          className={styles.bgimg}
          src="/img-mv.jpg"
          alt=""
          width={4000}
          height={1200}
          priority
          sizes="100vw"
        />
      </section>

      <section className={styles.news}>
        <h2 className={styles.newsTitle}>News</h2>
        <NewsList news={date.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっとみす</ButtonLink>
          {/*「ButtonLink」タグはコンポーネントされる「ButtonLink/index.tsx」内の「return」以下の要素と合体する*/}
        </div>
      </section>
    </>
  );
}
