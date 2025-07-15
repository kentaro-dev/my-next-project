/*

検索結果ページ（元コードはニュース一覧ページ）

*/

import { getNewsList } from '@/app/_libs/microcms';
import { NEWS_LIST_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import SearchField from '@/app/_components/SearchField';

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  /*
  
  */
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    /*
  microCMS用のキーワード検索のためのパラメータ
  */
    q: searchParams.q,
  });

  //合体「news」を出力。
  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
