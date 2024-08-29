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
    const { data } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: maxLength ?? 150, // 한 페이지당 조회할 최대 푸시 이벤트 갯수
      page: 1,
    });

    if (!data.length) return null;

    return data as PushListResponse[];
  } catch (error) {
    // TODO: Error 처리
    console.error(`Error fetching events for user ${username}:`, error);
  }
};