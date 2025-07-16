//↓↓↓↓↓↓↓↓↓↓↓↓microCMSとの連携をする為の公式ソフトウェア開発キット（SDK）の読み込み設定↓↓↓↓↓↓↓↓↓↓↓↓
import { createClient } from 'microcms-js-sdk';

import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

//↑↑↑↑↑↑↑↑↑↑↑↑microCMSとの連携をする為の公式ソフトウェア開発キット（SDK）の読み込み設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓microCMSの各API設定↓↓↓↓↓↓↓↓↓↓↓↓

//メンバーAPI設定
export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

//カテゴリーAPI設定
export type Category = {
  name: string;
} & MicroCMSListContent;

//ニュースAPI設定
export type News = {
  title: string;
  description: string;
  content: string;
  //必須項目ではない場合「?」を付与
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

//↑↑↑↑↑↑↑↑↑↑↑↑microCMSの各API設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓microCMS・公式SDK接続設定↓↓↓↓↓↓↓↓↓↓↓↓

//「.env」ファイルを参照し、設定したmicroCMSのドメインが設定されているかチェック
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

//「.env」ファイルを参照し、設定したmicroCMSのAPIキーが設定されているかチェック
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

//公式ソフトウェア開発キット（SDK）がmicroCMSサーバーのサービスを利用するための設定
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

//↑↑↑↑↑↑↑↑↑↑↑↑microCMS・公式SDK接続設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓microCMSの各API読み込み設定↓↓↓↓↓↓↓↓↓↓↓↓

export const getMemberList = async (queries?: MicroCMSQueries) => {
  //「get××××List」←××××の部分は独自
  const listData = await client.getList<Member>({
    //「<××××>」←××××の部分は独自
    endpoint: 'members',
    //「"××××",」←××××の部分は各APIのエンドポイント参照
    queries,
  });
  return listData;
};

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: 'news',
    queries,
  });
  return listData;
};

//↑↑↑↑↑↑↑↑↑↑↑↑microCMSの各API読み込み設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓microCMSの各API（ニュース）読み込み設定↓↓↓↓↓↓↓↓↓↓↓↓

//1つの記事のみ読み込む場合「contentId: string」と記述（他は今までのリストと同じ）
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  //「detailData」は独自のもの
  const detailData = await client.getListDetail<News>({
    endpoint: 'news',

    //再び「contentId」と記述
    contentId,
    queries,
    //下記、データ単位のキャッシュ制御。ドラフトキーが設定されていれば（つまり下書きのこと）0秒キャッシュ。ドラフトキーがなければ60秒キャッシュ。
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  //「detailData」
  return detailData;
};
//↑↑↑↑↑↑↑↑↑↑↑↑microCMSの各API（ニュース）読み込み設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓カテゴリー名が存在するかチェックの設定↓↓↓↓↓↓↓↓↓↓↓↓
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: 'categories',
    contentId,
    queries,
  });
  return detailData;
};
//↑↑↑↑↑↑↑↑↑↑↑↑カテゴリー名が存在するかチェックの設定↑↑↑↑↑↑↑↑↑↑↑↑

//↓↓↓↓↓↓↓↓↓↓↓↓○○↓↓↓↓↓↓↓↓↓↓↓↓
//↑↑↑↑↑↑↑↑↑↑↑↑○○↑↑↑↑↑↑↑↑↑↑↑↑
