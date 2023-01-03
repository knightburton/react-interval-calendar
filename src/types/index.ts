export type WeeksHeight = number | '100%' | 'auto' | string;
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HighlightedItem = {
  id?: number | string;
  key?: number | string;
  start: Date;
  end: Date;
  color?: string;
};
export type VisibilityMatrix = {
  [week: number]: boolean;
};
export type ThemeOption = 'light' | 'dark';
export type CalendarTuple = [Date | null, Date | null, number];
export type HeaderWeekday = {
  key: number;
  label: string;
};

export type ClassNamesValue = string | number | boolean | undefined | null;
export type ClassNamesObject = Record<string, unknown>;
export type ClassNamesArray = Array<Argument>;
export type Argument = ClassNamesValue | ClassNamesObject | ClassNamesArray;
export type ClassNames = Argument;
export type ClassNamesProp = string | string[];
export type CustomClassNames = {
  calendar?: ClassNamesProp;
  calendarEmpty?: ClassNamesProp;
  header?: ClassNamesProp;
  headerWeekdays?: ClassNamesProp;
  headerWeekday?: ClassNamesProp;
  weeks?: ClassNamesProp;
  week?: ClassNamesProp;
  day?: ClassNamesProp;
  dayText?: ClassNamesProp;
  dayMonthText?: ClassNamesProp;
  dayYearText?: ClassNamesProp;
  dayHighlighted?: ClassNamesProp;
  daySelected?: ClassNamesProp;
  dayToday?: ClassNamesProp;
};
