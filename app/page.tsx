"use client";

import { useCallback, useEffect, useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./components/board";
import Calendar from "./lib/calendar";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./lib/date.types";
import type { ApiData } from './api/api.types';
import '../styles/globals.scss';
import { Commit } from "./api/commits";

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['200', '400', '600', '800', '900'],
});

export default function Home() {
  const sampleData: ApiData[] = [
    {
      id: 'limenough',
      name: 'Jiwon Lim',
      commitCount: 0,
      attendedDuo: true,
    },
    {
      id: 'JeonDev',
      name: '',
      commitCount: 12,
      attendedDuo: false,
    }
  ];

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [useInfo, setUserInfo] = useState<ApiData[]>(sampleData);

  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = useCallback(async () => {
    setLoading(true);

    const today = selectedDate.toString().split('T')[0]; // YYYY-MM-DD 포맷으로 가져옴

    try {
      const response = await fetch(
        `/api/commits?username=YOUR_GITHUB_USERNAME&repo=YOUR_REPO_NAME&date=${today}`
      );

      const data: Commit[] | { error: string } = await response.json();

      if (response.ok) {
        setCommits(data as Commit[]);
      } else {
        setError((data as { error: string }).error);
      }
    } catch (error) {
      setError('Failed to fetch commits');
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // 초기 실행
  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    <main className={classNames(styles.main, noto.className)}>
      <Calendar
        date={selectedDate}
        onChange={setSelectedDate}
      />

      <section className={styles.board}>
        {
          useInfo && useInfo.map((info, index) => {
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
