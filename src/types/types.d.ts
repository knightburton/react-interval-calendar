type ContextType = {
  startDate?: Date,
  numberOfWeeks: number,
  showWeekdays: boolean,
  weekStartsOn: number,
  fadeWeekends: boolean,
  height: number | '100%' | 'auto',
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number,
  label: string,
}
