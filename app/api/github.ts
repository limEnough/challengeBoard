import { isSameDay, parseISO } from 'date-fns';
import { PushListPayload, PushListResponse } from './github.types';
import { Octokit } from '@octokit/rest';
import { commitListInfo } from '../utils/github';

// Octokit 인스턴스 생성
const octokit = new Octokit({ 
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});
// #endregion

// 사용자 푸시 내역 조회하기
export const fetchUserPushList = async ({username, date, maxLength}: PushListPayload) => {
  try {
    const { data } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: maxLength ?? 30, // 한 페이지당 조회할 최대 푸시 이벤트 갯수
      page: 1,
    });

    if (!data.length) return null;

    // 푸시 내역 특정 날짜로 필터링
    const filteredByDate: PushListResponse[] = data.filter((list) => 
      list.type === 'PushEvent' && isSameDay(parseISO(list.created_at as string), date)
    );
    
    if (!filteredByDate.length) return null;

    // 유저 정보
    const userInfo = filteredByDate.map(list => list.actor)[0];

    // pushEvent 내 commit list 중첩배열 => 1차 배열로 변환
    const commitEvents = filteredByDate.map(list => list.payload.commits).reduce((prev, next) => prev.concat(next));

    return commitListInfo(commitEvents, userInfo);
  } catch (error) {
    console.error(`Error fetching events for user ${username}:`, error);
  }
};