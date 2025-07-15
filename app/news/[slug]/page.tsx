//↓↓↓↓↓↓↓↓↓↓↓↓ニュースの記事詳細ページの読み込み↓↓↓↓↓↓↓↓↓↓↓↓

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

export default async function Page({ params, searchParams }: Props) {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href='/news'>ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
