import { Day } from './IntervalCalendarDay.interface';

export interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  showHeader?: boolean;
  showWeekdays?: boolean;
  showToday?: boolean;
  showMonths?: boolean;
  showYears?: boolean;
  showBorder?: boolean;
  showBorderRadius?: boolean;
  showGutterBetweenHighlighted?: boolean;
  weekStartsOn?: WeekdayIndex;
  fadeWeekends?: boolean;
  height?: number | '100%' | 'auto';
  highlighted?: HighlightedItem[];
  locale?: string;
  emptyLabel?: string;
  onSelect?: (day: Day) => void;
  numberOfWeekFirstRender?: number;
  numberOfWeekPreRender?: number;
}
