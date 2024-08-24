import { isSameDay, parseISO } from 'date-fns';
import { PushListPayload, PushListResponse } from './github.types';
import { Octokit } from '@octokit/rest';

// Octokit 인스턴스 생성
const octokit = new Octokit({ 
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});
// #endregion

// 사용자 푸시 내역 조회하기
export const fetchUserPushList = async ({username, date, maxLength}: PushListPayload) => {
  try {
    let pushList: any[] = [];

    const { data } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: maxLength ?? 30, // 한 페이지당 조회할 최대 푸시 이벤트 갯수
      page: 1,
    });

    if (!data.length) return [];

    // 푸시 내역 특정 날짜로 필터링
    const filteredEvents = data.filter((list) => 
      // list.type === 'PushEvent' && isSameDay(parseISO(list.created_at as string), date)
      list.type === 'PushEvent' && isSameDay(parseISO(list.created_at as string), 'Fri Aug 23 2024 02:00:18 GMT+0900') // TODO: 푸시 내역 있는 날짜 하드코딩
    );

    if (!filteredEvents.length) return [];

    return pushList.concat(filteredEvents).map(list => list.payload.commits);
  } catch (error) {
    console.error(`Error fetching events for user ${username}:`, error);
  }
};