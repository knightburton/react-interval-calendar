export interface IntervalCalendarProps {
  start?: Date | null,
  end?: Date | null,
  showHeader?: boolean,
  showWeekdays?: boolean,
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  fadeWeekends?: boolean,
}
