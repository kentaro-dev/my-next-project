import Image from 'next/image';

//「microcms.ts」にて読み込んだAPI読み込み設定の読み込み
import { getMemberList } from '@/app/_libs/microcms';

//「_constants/index.ts」にて作成した表示上限の読み込み
import { MEMBERS_LIST_LIMIT } from '@/app/_constants';

import styles from './page.module.css';

export default async function Page() {
  //メンバーリスト上限は「MEMBERS_LIST_LIMIT」を参照してくださいの意
  const date = await getMemberList({ limit: MEMBERS_LIST_LIMIT });

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
