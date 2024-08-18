import React from "react"
;import Calendar from "react-calendar";
import moment from "moment";
import type { SelectedDate } from "./date.types";
import '../../styles/calendar-custom.scss';

interface CalendarProps {
  date: SelectedDate;
  onChange: (value: SelectedDate) => void;
}

const calendar = ({date, onChange}: CalendarProps) => {
  return (
    <Calendar 
      onChange={onChange} 
      value={date} 
      locale="ko"
      calendarType="hebrew" 
      view="month"
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
      formatDay={(locale, date) => moment(date).format("DD")}
    />
  )
}

export default calendar;