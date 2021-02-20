export interface IntervalCalendarProps {
  start?: Date,
  end?: Date,
  showHeader?: boolean,
  showWeekdays?: boolean,
  showBorder?: boolean,
  showBorderRadius?: boolean,
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  fadeWeekends?: boolean,
  height?: number | '100%' | 'auto',
}
