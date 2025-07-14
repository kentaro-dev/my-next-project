//↓↓↓↓↓↓↓↓↓↓↓↓出力される時刻を日本時間向けに設定する基本設定↓↓↓↓↓↓↓↓↓↓↓↓

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string) => {
  return dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/DD");
};
