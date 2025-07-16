/*

問い合わせページ


*/

import styles from './page.module.css';
import ContactForm from '@/app/_components/ContactForm';

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        ご質問ご相談は下記フォームよりお問い合わせくださああい。
        <br />
        内容確認後、担当者より通常三日以内にご連絡いたします。
      </p>
      <ContactForm />
    </div>
  );
}
