"use client";

import { useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./components/board";
import Calendar from "./lib/calendar";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./lib/date.types";
import type { ApiData } from './api/api.types';
import '../styles/globals.scss';

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
