export interface IntervalCalendarProps {
  start?: Date,
  end?: Date,
  showHeader?: boolean,
  showWeekdays?: boolean,
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  fadeWeekends?: boolean,
  height?: number | '100%' | 'auto',
}
