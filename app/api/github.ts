import { PushListPayload, PushListResponse } from '../types/github.types';
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
      // TODO: 월 이동한 경우, flag 추가하여 페이징 넘기고 new response => origin response 합치기
      username,
      per_page: maxLength ?? 100, // 한 페이지당 조회할 최대 푸시 이벤트 갯수
      page: 1,
    });

    if (!data.length) return null;

    return data as PushListResponse[];
  } catch (error) {
    // TODO: Error 처리
    console.error(`Error fetching events for user ${username}:`, error);
  }
};