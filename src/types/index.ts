export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type VisibilityMatrix = {
  [week: number]: boolean;
};
export type CalendarTuple = [Date | null, Date | null, number];
export type HeaderCellType = {
  key: number;
  short: string;
  long: string;
  narrow: string;
};
export type BodyCellType = {
  key: string;
  date: Date;
  day: string;
  month: string;
  year: string;
  isFirstDayOfYear: boolean;
  isMonthEven: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

export type ClassNamesValue = string | number | boolean | undefined | null;
export type ClassNamesObject = Record<string, unknown>;
export type ClassNamesArray = Array<Argument>;
export type Argument = ClassNamesValue | ClassNamesObject | ClassNamesArray;
export type ClassNames = Argument;
