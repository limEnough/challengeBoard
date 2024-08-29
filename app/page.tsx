"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./components/board";
import Calendar from "./lib/calendar";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./lib/date.types";
import { fetchUserPushList } from "./api/github";
import Loading from "./components/loading";
import Empty from "./components/empty";
import ErrorPage from "./components/error";
import { PushListResponse } from "./api/github.types";
import { getFilteredPushListByDate, makeBoardData } from "./utils/github";
import '../styles/globals.scss';

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['200', '400', '600', '800', '900'],
});

export default function Home() {
  // #region useState
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const [user1GithubPushList, setUser1GithubPushList] = useState<PushListResponse[] | null>(null);
  const [user2GithubPushList, setUser2GithubPushList] = useState<PushListResponse[] | null>(null);

  const [userData1, setUserData1] = useState<Board | null>(null);
  const [userData2, setUserData2] = useState<Board | null>(null);

  const [boardData, setBoardData] = useState<Board[]>([]);
  // #endregion

  // #region API
  /** 깃헙 푸시 내역 조회 */
  const getGithubPushList = useCallback(async () => {
    try {
      setLoading(true);
      
      const userData1 = await fetchUserPushList({
        username: process.env.NEXT_PUBLIC_GITHUB_HER_USERNAME as string,
        date: selectedDate,
      });

      const userData2 = await fetchUserPushList({
        username: process.env.NEXT_PUBLIC_GITHUB_HIM_USERNAME as string,
        date: selectedDate,
      });

      setUser1GithubPushList(userData1 ?? null);
      setUser2GithubPushList(userData2 ?? null);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);
  // #endregion

  // #region Func
  /** 날짜 필터링한 커밋 데이터 가져오기 */
  const getCommitDataByDate = useCallback(async () => {
    if (!user1GithubPushList?.length || !user2GithubPushList?.length) return;

    setLoading(true);
    
    setBoardData([]); //초기화

    const filteredUser1ByDate = getFilteredPushListByDate(user1GithubPushList, selectedDate);
    const filteredUser2ByDate = getFilteredPushListByDate(user2GithubPushList, selectedDate);

    if (filteredUser1ByDate) setUserData1(makeBoardData(filteredUser1ByDate));
    else setUserData1(null);

    if (filteredUser2ByDate) setUserData2(makeBoardData(filteredUser2ByDate));
    else setUserData2(null);

    setLoading(false);
  }, [selectedDate]);

  /** 페이지 초기 실행 함수 (비동기 함수로 분리) */
  const pageInit = useCallback(async () => {
    await getGithubPushList();
    getCommitDataByDate();
  }, [])
  // #endregion

  // #region uesEffect
  /** 날짜 업데이트 감지 */
  useEffect(() => {
    getCommitDataByDate();
  }, [selectedDate]);

  /** 유저 별 데이터 업데이트 감지 */
  useEffect(() => {
    const result = [];

    if (userData1) result.push(userData1);
    if (userData2) result.push(userData2);

    setBoardData(result)
  }, [userData1, userData2]);
  // #endregion
  
  // 초기 실행
  useEffect(() => {
    pageInit();
  }, []);

  return (
    <main className={classNames(styles.main, noto.className)}>
    {
      error
      ?
      <ErrorPage />
      :
      <>
        {/* 캘린더 */}
        <Calendar
          date={selectedDate}
          onChange={setSelectedDate}
        />

        {/* 유저 현황 보드 */}
        <section className={styles.board}>
        {
          loading 
          ?
          <Loading />
          :
            !boardData.length
            ?
            <Empty />
            :
            <>
            {
              boardData && boardData.map((info, index) => {
                return (
                  <Board
                    info={info}
                    key={`board-${index}`}
                  />
                )
              })
            }
          </>
        }
        </section>
      </>
    }
    </main>
  );
}
