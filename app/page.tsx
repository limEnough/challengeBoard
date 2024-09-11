"use client";

import { useCallback, useEffect, useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./components/board/Board";
import CalendarComponent, { UpdatedDate } from "./lib/calendar/Calendar";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./types/date.types";
import { fetchUserPushList } from "./api/github";
import Empty from "./components/empty/Empty";
import ErrorPage from "./components/error/Error";
import Loading from "./components/loading/Loading";
import { PushListResponse } from "./types/github.types";
import { getFilteredPushListByDate, makeBoardData } from "./utils/github";
import { toast } from 'react-toastify';
import { getGlobalKoreaTime } from "./utils/date";
import '../styles/globals.scss';

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['200', '400', '600', '800', '900'],
});

export default function Home() {
  // #region useState
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(getGlobalKoreaTime());

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
  /** 날짜 선택값 업데이트 */
  const handleSelectedDate = (value: UpdatedDate) => {
    setSelectedDate(value as Date);
  }

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
  }, [selectedDate, user1GithubPushList, user2GithubPushList]);

  /** 토스트 팝업 */
  const toastInit = useCallback(() => {
    toast.info("오늘도 반가워요!");
  }, [])

  /** 페이지 초기 실행 함수 (비동기 함수로 분리) */
  const pageInit = useCallback(async () => {
    await getGithubPushList();
    getCommitDataByDate();
    // toastInit(); // 토스트팝업 시범 적용
  }, [getGithubPushList, getCommitDataByDate])
  // #endregion

  // #region uesEffect
  /** 날짜 업데이트 감지 */
  useEffect(() => {
    getCommitDataByDate();
  }, [getCommitDataByDate]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <CalendarComponent
          date={selectedDate}
          onChange={handleSelectedDate}
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
