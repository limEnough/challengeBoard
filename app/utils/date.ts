/* 클라이언트 측 한국 시간 반환 */
const getClientKoreanTime = () => {
  const today = new Date();

  const options = {
    timeZone: 'Asia/Seoul',
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(today);
}

/* 서버 측 한국 시간 반환 */
const getServerKoreanTime = () => {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

export {
  getClientKoreanTime,
  getServerKoreanTime,
}