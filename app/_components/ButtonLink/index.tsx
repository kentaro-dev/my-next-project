import styles from "./index.module.css";

//当パーツを読み込んでいるHTMLと連動（この場合はトップページ）するtype「Props」と「children: React.ReactNode;」はセット。hrefは別として読み込む。

type Props = {
  children: React.ReactNode;
  href: string;
};

//「{children}」にはトップページ内の「<ButtonLink>」の子要素が入る
//↓↓↓↓↓↓↓↓「href, children」を渡す書き方↓↓↓↓↓↓↓↓
export default function ButtonLink({ href, children }: Props) {
  return (
    <a href={href} className={styles.button}>
      {children}
    </a>
    //トップページの「<ButtonLink>」部分とreturn以下の要素は合体。さらにクラス名が勝手に変わり「ButtonLink」と上記「{styles.button}」が合体して「ButtonLink_button」になる（＋変なIDも付く）。
  );
}

//以上によってボタンの見た目は共通させたいが、リンク先とボタン文言を別にできる
