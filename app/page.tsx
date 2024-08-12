"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Header from "./header";
import Board from "./board";
import Calendar from "react-calendar";
import type { SelectedDate } from "./date.types";


export default function Home() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={styles.calendar}>
        <Calendar 
          onChange={setSelectedDate} 
          value={selectedDate} 
          locale="ko"
          calendarType="gregory" 
          view="month"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
        />
      </div>

      <Board />
    </main>
  );
}
