//ページの余白などを共通化するためのファイル

import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Sheet({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
