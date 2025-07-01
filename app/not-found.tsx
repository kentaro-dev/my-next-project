import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <dl>
        <dt className={styles.title}>ページが見つかりませんでした～</dt>
        <dd className={styles.text}>
          あなたがアクセスしようとしたぺーじはありましぇん
          <br />
          URLを確認してー
        </dd>
      </dl>
    </div>
  );
}
