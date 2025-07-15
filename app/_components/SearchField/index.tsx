'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './index.module.css';
import { Suspense } from 'react';

function SearchFieldComponent() {
  const router = useRouter();
  /*
    下記、検索しても検索ワードを残しておく設定
    
    */
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /*
    フォーム内容をサーバーに送信するというデフォルト動作をキャンセル
    （検索フォームなのでサーバーは使わない）
    
    */
    e.preventDefault();

    /*
    
    下部HTMLのinput name="q"を取得
    
    */
    const q = e.currentTarget.elements.namedItem('q');

    /*
    
    input要素にてユーザーが入力した値を取得
    
    */
    if (q instanceof HTMLInputElement) {
      /*
    
    
    
    */
      const params = new URLSearchParams();

      /*
    
    
    
    */
      params.set('q', q.value.trim());

      /*
    
    
    
    */
      router.push(`/news/search?${params.toString()}`);
    }
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

export default function SearchField() {
  return (
    <Suspense>
      <SearchFieldComponent />
    </Suspense>
  );
}
