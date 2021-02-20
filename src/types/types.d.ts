type WeeksHeight = number | '100%' | 'auto';

type ContextType = {
  startDate?: Date,
  numberOfWeeks: number,
  showWeekdays: boolean,
  weekStartsOn: number,
  fadeWeekends: boolean,
  weeksHeight: WeeksHeight,
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number,
  label: string,
}
