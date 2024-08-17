"use client";

import { useState } from "react";
import classNames from 'classnames';
import styles from "./page.module.scss";
import Board from "./board";
import Calendar from "react-calendar";
import moment from "moment";
import { Noto_Sans_KR } from 'next/font/google';
import type { SelectedDate } from "./date.types";
import '../styles/globals.scss';
import '../styles/calendar-custom.scss';

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['200', '400', '600', '800', '900'],
});

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return (
    // noto.className
    <main className={classNames(styles.main, noto.className)}>
      <Calendar 
        className={styles.calendar}
        onChange={setSelectedDate} 
        value={selectedDate} 
        locale="ko"
        calendarType="gregory" 
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format("DD")}
      />

      <Board />
    </main>
  );
}
