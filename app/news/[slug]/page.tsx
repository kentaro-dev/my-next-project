/*

ニュースの記事詳細ページ


*/

//メタデータの共通化
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getNewsDetail } from '@/app/_libs/microcms';

import Article from '@/app/_components/Article';
import ButtonLink from '@/app/_components/ButtonLink';

import styles from './page.module.css';

type Props = {
  params: {
    slug: string;
  };

  /*
  
  以下、プレビュー画面の設定
  URLに下書きキー（dk）が含まれているかどうかで下書きを表示するか判定する
  
  */
  searchParams: {
    dk?: string;
  };
};

//以下メタ情報設定。コンテンツの内容をもとに設定してくれる。
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url ?? ''],
    },
  };
}

//更新反映を早めるためキャッシュ保存期間を0にする。これによってレンダリング方式がSSRになる。
// export const revalidate = 0;

//キャッシュ保存期間を60にする。これによってレンダリング方式がISRになり、定期的にキャッシュを更新してくれる。
// export const revalidate = 60;

export default async function Page({ params, searchParams }: Props) {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
