import React, { useState } from "react"
import { format, getMonth } from "date-fns";
;import Calendar from "react-calendar";
import type { SelectedDate } from "../../types/date.types";
import '../../../styles/calendar-custom.scss';

// #region Calendar lib Types
type ValuePiece = Date | null;
type Range<T> = [T, T];
type Value = ValuePiece | Range<ValuePiece>;

interface NavigateProps {
  action: 'prev' | 'prev2' | 'next' | 'next2' | 'onChange' | 'drillUp' | 'drillDown';
  activeStartDate: Date | null;
  value: Value;
  view: 'century' | 'decade' | 'year' | 'month';
}
// #endregion

interface CalendarProps {
  date: SelectedDate;
  onChange: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CalendarComponent = ({date, onChange}: CalendarProps) => {
  const [disabledNavClass, setDisabledNavClass] = useState('');

  const handleNavigation = ({action, activeStartDate, value}: NavigateProps) => {
    const currentMonth = getMonth(activeStartDate as Date);
    const todayMonth = getMonth(new Date());
    
    if (action === 'prev' && todayMonth - currentMonth > 0) {
      // 이전달로 이동한 상태
      setDisabledNavClass('disable-prev');
    } else if (action === 'next' && currentMonth - todayMonth > 0) {
      // 다음달로 이동한 상태
      setDisabledNavClass('disable-next');
    } else {
      // 현재달인 상태
      setDisabledNavClass('');
    }
  }

  return (
    <Calendar
      className={disabledNavClass}
      onChange={onChange} 
      value={date} 
      locale="ko"
      calendarType="gregory" 
      view="month"
      prev2Label={null}
      next2Label={null}
      showNavigation={true}
      showNeighboringMonth={false}
      onActiveStartDateChange={handleNavigation}
      formatDay={(locale, date) => format(date, 'dd')}
    />
  )
}

export default CalendarComponent;
export type { Value as UpdatedDate }