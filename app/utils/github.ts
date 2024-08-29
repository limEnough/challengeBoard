import { toZonedTime } from "date-fns-tz";
import { Commit, GithubUser, PushListResponse } from "../api/github.types";
import Board from "../components/board";
import { isSameDay } from "date-fns";

interface CommitInfo {
  userInfo: GithubUser;
  commitList: Commit[]
}

/** 특정 날짜의 푸시 내역 조회하기 */
export const getFilteredPushListByDate = (data: PushListResponse[], date: Date): PushListResponse[] | null => {
  const filteredByDate = data.filter((list) => {
    const kstDate = toZonedTime(list.created_at as string, 'Asia/Seoul'); 
    return list.type === 'PushEvent' && isSameDay(kstDate, date);
  });

  return filteredByDate?.length ? filteredByDate : null;
}

/** 커밋 정보 추출하여 보드데이터 만들기 */
export const makeBoardData = (data: PushListResponse[]): Board => {
  // 유저 정보
  const userInfo = data.map(list => list.actor)[0];

  // pushEvent 내 commit list 중첩배열 => 1차 배열로 변환
  const commitEvents = data.map(list => list.payload.commits).reduce((prev, next) => prev.concat(next));

  // 커밋 메시지 추출하기
  const commitMessages = commitEvents.map(commit => commit.message);

  return {
    name: userInfo.display_login,
    avatarUrl: userInfo.avatar_url,
    url: `https://github.com/${userInfo.display_login}`,
    commitMessages,
    pushCount: commitMessages.length,
  }
}