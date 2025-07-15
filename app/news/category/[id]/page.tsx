/*

ニュースの「カテゴリー別」一覧ページ

*/

//「microcms.ts」にて読み込んだAPI読み込み設定の読み込み
import { getCategoryDetail, getNewsList } from '@/app/_libs/microcms';

//「notFound」を使うための一文
import { notFound } from 'next/navigation';

//トップページに作成しコンポーネント化したニュースリスト部品の読み込み
import NewsList from '@/app/_components/NewsList';

//コンポーネント化したページネーション部品の読み込み
import Pagination from '@/app/_components/Pagination';

//トップページに作成しコンポーネント化した部品の読み込み
import Category from '@/app/_components/Category';

//ニュース表示上限数設定
import { NEWS_LIST_LIMIT } from '@/app/_constants';

//出力するカテゴリー種の設定
type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  //「notFound」を使うための一文
  const category = await getCategoryDetail(params.id).catch(notFound);
  //「news/page.tsx」のコードにカテゴリー別に出力するコードを加えている。そういうものと覚える他なし。
  //因みに実習中フォルダ名を「cetegory」としてしまい手間取った。
  const { contents: news, totalCount } = await getNewsList({
    //ニュース表示上限数設定
    limit: NEWS_LIST_LIMIT,
    //下記、表示する記事種（カテゴリー）をIDによって分けるという設定文
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} />
        の一覧
      </p>
      <NewsList news={news} />

      <Pagination
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
