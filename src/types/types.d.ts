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
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number,
  label: string,
}
