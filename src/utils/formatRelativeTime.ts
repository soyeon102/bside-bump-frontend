import { formatDate } from "./formatDate";

export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이

  if (diff < 60) return `${diff}초 전`;
  const diffMinutes = Math.floor(diff / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;

  return formatDate(date); // 기존 함수 활용 (7일 이상은 일반 날짜 표시)
};
