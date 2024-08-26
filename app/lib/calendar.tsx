import React from "react"
import { format } from "date-fns";
;import Calendar from "react-calendar";
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
      calendarType="gregory" 
      view="month"
      prev2Label={null}
      next2Label={null}
      showNavigation={false}
      showNeighboringMonth={false}
      formatDay={(locale, date) => format(date, 'dd')}
    />
  )
}

export default calendar;