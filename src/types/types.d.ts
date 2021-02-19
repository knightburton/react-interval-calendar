type ContextType = {
  startDate?: Date,
  numberOfWeeks: number,
  showWeekdays: boolean,
  weekStartsOn: number,
  fadeWeekends: boolean,
};

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number,
  label: string,
}
