//↓↓↓↓↓↓↓↓↓↓↓↓ニュースの投稿日付設定↓↓↓↓↓↓↓↓↓↓↓↓

import Image from "next/image";
import styles from "./index.module.css";

//投稿日時の日本時間向けのフォーマット設定
import { formatDate } from "@/app/_libs/utils";

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return (
    <span className={styles.date}>
      <Image src="/clock.svg" alt="" width={16} height={16} loading="eager" />
      {formatDate(date)}
    </span>
  );
}
