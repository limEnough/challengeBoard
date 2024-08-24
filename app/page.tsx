"use client";

import { useCallback, useEffect, useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./components/board";
import Calendar from "./lib/calendar";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./lib/date.types";
import type { ApiSampleData } from './api/api.types';
import { fetchUserPushList } from "./api/github";
import '../styles/globals.scss';
import { Commit } from "./api/github.types";

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['200', '400', '600', '800', '900'],
});

export default function Home() {
  // #region Api
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // #endregion

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [userInfo, setUserInfo] = useState<ApiSampleData[]>([]);
  
  // #region Data Custom
  /** 조회한 깃헙 푸시 내역 데이터 커스텀 */
  const setGithubData = useCallback((userInfo1: Commit[], userInfo2: Commit[]) => {
    console.log('실행여부');

    setUserInfo([
      {
        email: userInfo1[0].auth.email,
        name: userInfo1[0].auth.name,
        pushCount: userInfo1.length,
        attendedDuo: false,
      },
      {
        email: userInfo2[0].auth.email,
        name: userInfo2[0].auth.name,
        pushCount: userInfo2.length,
        attendedDuo: false,
      }
    ])
  }, [userInfo]);
  // #endregion

  // #region API
  /** 깃헙 푸시 내역 조회 */
  const getGithubPushList = useCallback(async () => {
    setLoading(true);

    const user1 = process.env.NEXT_PUBLIC_GITHUB_HER_USERNAME as string;
    const user2 = process.env.NEXT_PUBLIC_GITHUB_HIM_USERNAME as string;

    try {
      const userInfo1 = await fetchUserPushList({
        username: user1,
        date: selectedDate,
      });

      const userInfo2 = await fetchUserPushList({
        username: user2,
        date: selectedDate,
      });

      if (userInfo1 && userInfo2) setGithubData(userInfo1, userInfo2);
    } catch (error) {
      setError('Error getGithubPushList');
    } finally {
      setLoading(false);
    }
  }, [selectedDate, setGithubData]);
  // #endregion 

  useEffect(() => {
    getGithubPushList();
  }, [selectedDate]);

  return (
    <main className={classNames(styles.main, noto.className)}>
      {/* 캘린더 */}
      <Calendar
        date={selectedDate}
        onChange={setSelectedDate}
      />

      {/* 유저 현황 보드 */}
      <section className={styles.board}>
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
      </section>
    </main>
  );
}
