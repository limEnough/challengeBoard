import { toZonedTime } from "date-fns-tz";

/* 클라이언트 측 한국 시간 반환 */
const getClientKoreaTime = () => {
  const today = new Date();

  const options = {
    timeZone: 'Asia/Seoul',
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(today);
}

/* 서버 측 한국 시간 반환 */
const getServerKoreaTime = () => {
  const today = new Date();

  return today.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

/* 글로벌 한국 시간 반환 */
const getGlobalKoreaTime = () => {
  // 사용자 시간대
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 사용자의 로컬 시간으로 변환
  const localDate = toZonedTime(new Date(), userTimeZone);
  
  return localDate;
}

export {
  getClientKoreaTime,
  getServerKoreaTime,
  getGlobalKoreaTime,
}