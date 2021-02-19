export interface SingleDay {
  key: string,
  date: Date,
  display: string,
  isMonthEven: boolean,
  isFirstDayOfMonth: boolean,
  isLastDayOfMonth: boolean,
  isToday: boolean,
  isWeekend: boolean,
}

export interface IntervalCalendarDayProps {
  day: SingleDay,
}
