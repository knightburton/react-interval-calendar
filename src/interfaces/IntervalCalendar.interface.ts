import { Day } from './IntervalCalendarDay.interface';

export interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  theme?: ThemeOption;
  showHeader?: boolean;
  showHeaderWeekdays?: boolean;
  showToday?: boolean;
  showMonths?: boolean;
  showYears?: boolean;
  showBorder?: boolean;
  showBorderRadius?: boolean;
  showGutterBetweenHighlighted?: boolean;
  showMonthStripes?: boolean;
  weekStartsOn?: WeekdayIndex;
  fadeWeekends?: boolean;
  height?: number | '100%' | 'auto';
  highlighted?: HighlightedItem[];
  locale?: string;
  emptyLabel?: string;
  onSelect?: (day: Day) => void;
  numberOfWeekFirstRender?: number;
  numberOfWeekPreRender?: number;
  customClassNames?: CustomClassNames;
}
