import Image from "next/image";
import styles from "./page.module.css";

const date = {
  contents: [
    {
      id: 1,
      image: {
        url: "/img-member1.jpg",
        width: 240,
        height: 240,
      },
      name: "デイビットちゃん",
      position: "CEO",
      profile: "グローバルカンパニーでうんたらかんたら～",
    },
    {
      id: 2,
      image: {
        url: "/img-member2.jpg",
        width: 240,
        height: 240,
      },
      name: "エミリーちゃん",
      position: "CEO",
      profile: "うんたらかんたらうんたらかんたらうんたらかんたら",
    },
    {
      id: 3,
      image: {
        url: "/img-member3.jpg",
        width: 240,
        height: 240,
      },
      name: "ちゃんちゃんちゃん",
      position: "CEO",
      profile:
        "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト",
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.container}>
      {date.contents.length === 0 ? (
        <p className={styles.empty}>メンバーがとうろくされていましぇん</p>
      ) : (
        <ul>
          {date.contents.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                src={member.image.url}
                alt=""
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
