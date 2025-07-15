'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './index.module.css';
/*

    下記、検索部品のみをクライアントコンポーネント（ユーザー側の処理）にするための記述。
    これをしないとこの部品を読み込んだページすべてがクライアントコンポーネントになって動作が重くなってしまう。
    
    */
import { Suspense } from 'react';

function SearchFieldComponent() {
  const router = useRouter();
  /*
    下記、検索しても検索ワードを残しておく設定
    
    */
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /*
    ・フォーム内容をサーバーに送信するというデフォルト動作をキャンセル
    ・今回はクエリパラメータだけで遷移するのでサーバー送信は不要
    （検索フォームなのでサーバーは使わない）
    
    */
    e.preventDefault();

    /*
    
    下部HTMLのinput要素を取得。
    
    */
    const q = e.currentTarget.elements.namedItem('q');

    /*
    
    ・取得した要素が本当に <input> かどうかを確認
    ・安全に .value を使うためのチェック
    
    */
    if (q instanceof HTMLInputElement) {
      /*
    
    ・URLのクエリパラメータを簡単に扱える便利なオブジェクト
    ・例：params.set('q', 'react') → ?q=react
    
    */
      const params = new URLSearchParams();

      /*
    
      ・ユーザーが入力した文字列を取得して、先頭・末尾の空白を削除「 .trim() 」
      ・それを "q" という名前でクエリに追加（例：?q=react）
    
      */
      params.set('q', q.value.trim());

      /*

      ・クエリ付きURLへ遷移（/news/search?q=〇〇）
      ・params.toString() で URLSearchParams を文字列化（例：q=react）
      ※router は useRouter() などで定義されているはずなので、コードの外側で宣言されている前提です。
    
      */
      router.push(`/news/search?${params.toString()}`);
    }

    /*
    
    【最終的に何が起こる？】
    ユーザーがフォームに「React」と入力して送信すると：

    /news/search?q=React
    というページに JavaScript で遷移されます。ページはリロードされません。
    

    【まとめ表】
      コード	                    目的
      e.preventDefault()	        ページリロードを防ぐ
      elements.namedItem('q')	    フォームの input[name="q"] を取得
      q.value.trim()	            入力値を取得＆空白除去
      URLSearchParams	            クエリ文字列を簡単に作る
      router.push(...)	          クエリ付きURLに遷移


    */
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.search}>
        <Image
          src='/search.svg'
          alt='検索'
          width={16}
          height={16}
          loading='eager'
        />
        <input
          type='text'
          name='q'
          /*
            下記、検索しても検索ワードを残しておく設定
            */
          defaultValue={searchParams.get('q') ?? undefined}
          placeholder='キーワードを入力'
          className={styles.searchInput}
        />
      </label>
    </form>
  );
}

/*

    下記、検索部品のみをクライアントコンポーネント（ユーザー側の処理）にするための記述。
    これをしないとこの部品を読み込んだページすべてがクライアントコンポーネントになって動作が重くなってしまう。
    
    */
export default function SearchField() {
  return (
    <Suspense>
      <SearchFieldComponent />
    </Suspense>
  );
}
