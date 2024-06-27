import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Sử dụng plugin relativeTime
dayjs.extend(relativeTime);

// Hàm xuất ra thời gian tương đối
export const getRelativeTime = (time) => {
  const date = dayjs(time);
  return date.fromNow(); // Trả về thời gian tương đối từ bây giờ
};
