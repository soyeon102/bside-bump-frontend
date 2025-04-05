export const formatRemainingTime = (endDateString: string) => {
  const endDate = new Date(endDateString);
  const now = new Date();
  const diff = Math.floor((endDate.getTime() - now.getTime()) / 1000); // 초 단위 차이

  if (diff <= 0) return "투표 종료";

  const diffHours = Math.floor(diff / 3600);
  if (diffHours < 24) return `${diffHours}시간 남음`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 남음`;
};
