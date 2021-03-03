type WeeksHeight = number | '100%' | 'auto' | string;

type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type HighlightedItem = {
  is?: number | string;
  key?: nnumber | string;
  start: Date;
  end: Date;
  color: string;
};

type ContextType = {
  startDate?: Date;
  numberOfWeeks: number;
  showWeekdays: boolean;
  showToday: boolean;
  showMonths: boolean;
  showYears: boolean;
  weekStartsOn: WeekdayIndex;
  fadeWeekends: boolean;
  weeksHeight: WeeksHeight;
  highlighted: HighlightedItem[];
  locale: string;
  emptyLabel?: string;
  handleSelect?: (day: Day, resetFunction: () => void) => void;
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number;
  label: string;
};

type ClassNamesObject = {
  [string]: boolean;
};

type ClassNames = string | string[] | ClassNamesObject | ClassNamesObject[] | null | undefined;
