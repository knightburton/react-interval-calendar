type WeeksHeight = number | '100%' | 'auto';

type HighlightedItem = {
  is?: number | string,
  key?: nnumber | string,
  start: Date,
  end: Date,
  color: string,
};

type ContextType = {
  startDate?: Date,
  numberOfWeeks: number,
  showWeekdays: boolean,
  showMonths: boolean,
  showYears: boolean,
  weekStartsOn: number,
  fadeWeekends: boolean,
  weeksHeight: WeeksHeight,
  highlighted: HighlightedItem[],
  locale: string,
  handleSelect: (day: Day, resetFunction: () => void) => void,
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number,
  label: string,
}
