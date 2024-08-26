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
  const [userInfo, setUserInfo] = useState<Board[]>([]);
  const [userInfo1, setUserInfo1] = useState<Board | null>(null);
  const [userInfo2, setUserInfo2] = useState<Board | null>(null);
  // #endregion

  // #region API
  /** 깃헙 푸시 내역 조회 */
  const getGithubPushList = useCallback(async () => {
    const user1 = process.env.NEXT_PUBLIC_GITHUB_HER_USERNAME as string;
    const user2 = process.env.NEXT_PUBLIC_GITHUB_HIM_USERNAME as string;

    try {
      setLoading(true);
      setUserInfo([]); //초기화

      const userInfo1 = await fetchUserPushList({
        username: user1,
        date: selectedDate,
      });

      const userInfo2 = await fetchUserPushList({
        username: user2,
        date: selectedDate,
      });

      setUserInfo1(userInfo1 ?? null);
      setUserInfo2(userInfo2 ?? null);

    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);
  // #endregion 

  // #region uesEffect
  useEffect(() => {
    getGithubPushList();
  }, [selectedDate]);

  useEffect(() => {
    const result = [];

    if (userInfo1) result.push(userInfo1);
    if (userInfo2) result.push(userInfo2);

    setUserInfo(result)
  }, [userInfo1, userInfo2]);
  // #endregion

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
            !userInfo.length
            ?
            <Empty />
            :
            <>
            {
              userInfo && userInfo.map((info, index) => {
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
