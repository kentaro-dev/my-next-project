/*

ニュースの一覧ページのページネーション。
「 p\current 」はページネーションのファイル。

ニュースの「カテゴリー別」一覧ページのページネーション（news\category\[id]\p\[current]）の元コード


*/

import { notFound } from 'next/navigation';
import { getNewsList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';

//コンポーネント化したページネーション部品の読み込み
import Pagination from '@/app/_components/Pagination';

//ニュース表示上限数設定
import { NEWS_LIST_LIMIT } from '@/app/_constants';

//下記ページネーションページを作るうえでの定型文
type Props = {
  params: {
    current: string;
  };
};

//下記ページネーションページを作るうえでの定型文
export default async function Page({ params }: Props) {
  //下記ページネーションページを作るうえでの定型文
  const current = parseInt(params.current, 10);

  //ページURLに不正な文字がURL直打ちされたときの処理文。（数字じゃなくて文字、負の値や0）
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  //下記ページネーションページを作るうえでの定型文
  const { contents: news, totalCount } = await getNewsList({
    //ニュース表示上限数設定
    limit: NEWS_LIST_LIMIT,
    /*
    
    「 offsetクエリパラメータ 」コンテンツの取得開始位置を変更できる。
    offsetを0にすると1番目からコンテンツが取得される。

    例：1ページ目にいるとき→「10×(1-1)=0」→1番目からコンテンツを取得
    例2：3ページ目にいるとき→「10×(3-1)=20」→21番目からコンテンツを取得

    「NEWS_LIST_LIMIT」→「 app/_constants/index.ts 」で設定したニュースリスト表示上限数（10件）
    
    */
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  //ニュースコンテンツが存在しなかったときの処理
  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
