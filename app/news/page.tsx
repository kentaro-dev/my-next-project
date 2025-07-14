//「microcms.ts」にて読み込んだAPI読み込み設定の読み込み
import { getNewsList } from "@/app/_libs/microcms";

//トップページに作成しコンポーネント化したニュースリスト部品の読み込み
import NewsList from "@/app/_components/NewsList";

export default async function Page() {
  //「microcms.ts」にて読み込んだAPIを「NewsList/index.tsx」にて作成したニュースリストに合体し「contents: news」にて宣言。「members/page.tsx」と記述が違うのは下記「return」以降のリストについての記述がコンポーネント化されているからだと思われる。
  const { contents: news } = await getNewsList();

  //合体「news」を出力。
  return <NewsList news={news} />;
}
