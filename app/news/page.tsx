/*

ニュースの一覧ページ

*/

//「microcms.ts」にて読み込んだAPI読み込み設定の読み込み
import { getNewsList } from '@/app/_libs/microcms';

//トップページに作成しコンポーネント化したニュースリスト部品の読み込み。このコードによって、「microcms.ts」にて読み込んだAPIをJSONコードそのままではなくニュースリストのようにHTMLコードに整えて出力してくれる。
import NewsList from '@/app/_components/NewsList';

//コンポーネント化したページネーション部品の読み込み
import Pagination from '@/app/_components/Pagination';

//コンポーネント化した検索部品の読み込み
import SearchField from '@/app/_components/SearchField';

//ニュース表示数の上限設定
import { NEWS_LIST_LIMIT } from '@/app/_constants';

//更新反映を早めるためキャッシュ保存期間を0にする。これによってレンダリング方式がSSRになる。
// export const revalidate = 0;

//キャッシュ保存期間を60にする。これによってレンダリング方式がISRになり、定期的にキャッシュを更新してくれる。
// export const revalidate = 60;

export default async function Page() {
  //「microcms.ts」にて読み込んだAPIを「NewsList/index.tsx」にて作成したニュースリストに合体し「contents: news」にて宣言。
  // 「members/page.tsx」と記述が違うのは下記「return」以降のリストについての記述がコンポーネント化されているからだと思われる。

  /*
  
  「 getNewsList 」からmicroCMSの仕様に基づいて「 totalCount 」を取得している
  
  「 getNewsList 」でわかること
  contents: ニュース記事の配列（中身がメイン）
  totalCount: 総記事数（ページネーションなどに使う）
  limit: 1回で取得した件数
  offset: 何件目から取得したか
  
  */
  const { contents: news, totalCount } = await getNewsList({
    //ニュース表示数の上限設定
    limit: NEWS_LIST_LIMIT,
  });

  //合体「news」を出力。
  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
