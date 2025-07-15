/*

ページネーションへの遷移ボタン

*/

//ニュース表示上限数設定
import { NEWS_LIST_LIMIT } from '@/app/_constants';

import Link from 'next/link';
import styles from './index.module.css';

//この部品（コンポーネント）で設定する値の一覧
type Props = {
  /*
  
  「 totalCount 」はこちらで勝手に付けた名前。「 number 」は数字だよってことを示している。
  ここで定義されている「 totalCount 」は、あくまで「受け取るべき型」を示しているだけ
  ページリンクを生成するにはニュースの合計数を踏まえたページの数把握する必要がある。
  
  */
  totalCount: number;
  current?: number;

  /*
  
  ドメインの後ろ（サイトURL以下の最高位）の文字を設定できる
  
  */
  basePath?: string;
};

/*

「 export default ~ 」部品をほかのページで使用する時の書き出し文章。
この中にいろいろよくわからない設定を書く。
今回はニュースの合計数を踏まえたページの数を把握する文章。
この関数の引数「 ({ totalCount }: Props)  」で、呼び出し元から合計数を取得。

*/
export default function Pagination({
  totalCount,
  current = 1,

  /*
  
  ドメインの後ろ（サイトURL以下の最高位）の文字を「 /news 」に設定
  
  */
  basePath = '/news',
}: Props) {
  /*
    
    「Array.from(arrayLike, mapFunction)」
    arrayLike は長さが決まっている配列風のオブジェクト（ここでは { length: ... } で長さだけを指定。）
    mapFunction はその配列の各要素に対して実行される関数

    */
  const pages = Array.from(
    /*
    「arrayLike」

    「(totalCount / NEWS_LIST_LIMIT)」→「合計数÷表示上限数」
    例えば「23÷10」なら「 2.3 」。さらに「 Math.ceil 」は「 () 」内の数を超える最小の整数を挙げてくれるのでこの場合「 length 」（ページ合計数）は「 3 」になる。
    
    */
    { length: Math.ceil(totalCount / NEWS_LIST_LIMIT) },

    /*
    「mapFunction」

    「アロー関数」で
    「 (_,i) 」関数は→「 i+1 」だよ。と言っている。

    第1引数 _ ：今回のケースでは使わないので、 _ にしている
    第2引数 i ：0から始まる番号。
    
    */
    (_, i) => i + 1

    /*
    
    今回の場合「totalCount」によって答えが変わる。
    「totalCount」が43だったら→「arrayLike」（上限）は「 5 」「mapFunction」（繰り返し処理と個別化）は「0,1,2,3,4」になる。
    
    */
  );

  //「 return 」は実際に吐き出されるHTMLコード
  return (
    <nav>
      <ul className={styles.container}>
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link href={`/${basePath}/p/${p}`} className={styles.item}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
