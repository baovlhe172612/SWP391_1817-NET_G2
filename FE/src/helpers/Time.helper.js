import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Sử dụng plugin relativeTime
dayjs.extend(relativeTime);

// Hàm xuất ra thời gian tương đối
export const getRelativeTime = (time) => {
  const date = dayjs(time);
  return date.fromNow(); // Trả về thời gian tương đối từ bây giờ
};

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
