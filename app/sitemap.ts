import { MetadataRoute } from 'next';

//microcmsで設定したニュースとニュースカテゴリー全取得関数を使ってサイトマップへ反映さす。
import { getAllCategoryList, getAllNewsList } from './_libs/microcms';

const buildUrl = (path?: string) => `http://localhost:3000${path ?? ''}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //ニュースとニュースカテゴリー全取得関数を使ってサイトマップへ反映
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllCategoryList();

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/news/${content.id}`),
    lastModified: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      url: buildUrl(`/news/category/${content.id}`),
      lastModified: content.revisedAt,
    })
  );
  //ニュースとニュースカテゴリー全取得関数を使ってサイトマップへ反映

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl('/members'),
      lastModified: now,
    },
    {
      url: buildUrl('/contact'),
      lastModified: now,
    },
    {
      url: buildUrl('/news'),
      lastModified: now,
    },
    //ニュースとニュースカテゴリー全取得関数を使ってサイトマップへ反映
    ...newsUrls,
    ...categoryUrls,
    //ニュースとニュースカテゴリー全取得関数を使ってサイトマップへ反映
  ];
}
