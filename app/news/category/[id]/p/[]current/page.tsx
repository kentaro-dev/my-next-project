/*

ニュースの「カテゴリー別」一覧ページのページネーション
※元コードはnews/p/[current]/page.tsx（通常ニュースのページネーション）

*/

import { notFound } from 'next/navigation';
import { getCategoryDetail, getNewsList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';

import { NEWS_LIST_LIMIT } from '@/app/_constants';

/*

params はどこから来るの？：Next.jsがURLから自動で渡してくれる
どういうときに？：フォルダ名やファイル名に [current] のような 動的ルート を使ったとき
何が入るの？：URLのパラメータ値（例：/p/2 → params.current = "2"）

*/
type Props = {
  params: {
    /*
    
    「 id: string; 」が元コードとの差異
    カテゴリー（プレスリリースとかお知らせとか）に紐づくニュースのみ表示するため、「idという文章を取り扱うよ」という宣言
    
    */
    id: string;
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  /*
  
  下記、元コードとの差異。「カテゴリ詳細を取得する。
  もしカテゴリが存在しないなどの理由で取得に失敗したら、404ページに飛ばす」の意。
  ① 「 await getCategoryDetail(params.id) 」
    「 params.id 」 を使って、カテゴリ詳細を取得しようとしている
    「 getCategoryDetail 」 は非同期関数（＝APIなどでデータを取得する関数）で、Promise を返す
    「 await 」 を使うことで、データが返ってくるまで処理を待つ


    ② 「 .catch(notFound) 」
      もし 「 getCategoryDetail() 」 の実行中にエラーが起きたら、catch() の中が呼ばれる。
      ここでは notFound を直接渡しているので、エラー時に notFound() が実行される
  
  */
  const category = await getCategoryDetail(params.id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    /*
    
    「 filters: `category[equals]${category.id}`, 」元コードとの差異。
    microCMSのAPIに対して「絞り込み条件（フィルター）」を指定している部分。

    filters: `フィールド名[条件]値`


    部分	          意味
  category	        microCMSの「記事」データにあるフィールド名（たとえばカテゴリ）
  [equals]	        「等しい」を意味する条件（演算子）
  ${category.id}	  フィルター対象の値（選択されたカテゴリのID）を埋め込んでる

  つまりこれは：
  「category フィールドが category.id と一致する記事だけ取得して」という意味です。
    
    */
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        /*
        
        「 basePath={`/news/category/${category.id}`} 」が元コードとの差異。
        basePath を元に、/basePath/p/1, /basePath/p/2… のようなリンクを生成したいときなどにつかうプロパティ名。
        これは テンプレートリテラルと呼ばれる書き方で、category.id の中身が "sports" だったら、次のようになる。
        
        "/news/category/sports"
        
        */
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
