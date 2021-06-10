import { CustomClassNames, HighlightedItem, ThemeOption, WeekdayIndex } from '../types';
import { Day } from './IntervalCalendarDay.interface';

export interface IntervalCalendarProps {
  start?: Date;
  end?: Date;
  customClassNames?: CustomClassNames;
  enableSelect?: boolean;
  emptyLabel?: string;
  fadeWeekends?: boolean;
  height?: number | '100%' | 'auto';
  highlighted?: HighlightedItem[];
  highlightedColorAlpha?: number;
  locale?: string;
  numberOfWeekFirstRender?: number;
  numberOfWeekPreRender?: number;
  onSelect?: (day: Day) => void;
  showBorder?: boolean;
  showBorderRadius?: boolean;
  showGutterBetweenHighlighted?: boolean;
  showHeader?: boolean;
  showHeaderWeekdays?: boolean;
  showMonthStripes?: boolean;
  showMonths?: boolean;
  showToday?: boolean;
  showYears?: boolean;
  theme?: ThemeOption;
  weekStartsOn?: WeekdayIndex;
}
