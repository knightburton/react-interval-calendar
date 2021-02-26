/**
 * Gets year from date.
 *
 * @param date Date to get year from.
 */
export const getYear = (date: Date | number | string): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getFullYear();

  // example: 2021
  if (typeof date === 'number') return date;

  // example: '2021-12-02'
  const year = parseInt(date, 10);
  if (typeof date === 'string' && !Number.isNaN(year)) return year;

  throw new Error(`${date} cannot be used to get the year from.`);
};

/**
 * Gets month from date.
 *
 * @param date Date to get month from.
 */
export const getMonth = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getMonth();

  throw new Error(`${date} cannot be used to get the month from.`);
};

/**
 * Gets the day of the month.
 *
 * @param date Date to get the day of month from.
 */
export const getDate = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getDate();

  throw new Error(`${date} cannot be used to get the day of the month from.`);
};

/**
 * Gets the day of the week.
 *
 * @param date Date to get the day of the week from.
 */
export const getDay = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getDay();

  throw new Error(`${date} cannot be used to get the day of the week from.`);
};

/**
 * Gets the timestamp of the given date.
 *
 * @param date Date to get the timestamp form.
 */
export const getTimestamp = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getTime();

  throw new Error(`${date} cannot be used to get the timestamp from.`);
};

/**
 * Gets the start of the month from date.
 *
 * @param date Date to get the start of the mont from.
 */
export const getMonthStart = (date: Date): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  // Create a new date with the date's year and month
  // on the first day at 00:00.
  return new Date(year, month, 1, 0, 0, 0, 0);
};

/**
 * Gets the end of the month from date.
 *
 * @param date Date to get the end of the mont from.
 */
export const getMonthEnd = (date: Date): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  // Create a new date with the date's year and the next month
  // on the last day of the previous month at 00:00.
  // The day 0 means the last day of previous month.
  return new Date(year, month + 1, 0, 23, 59, 59, 999);
};

/**
 * Gets the start of the week from date.
 *
 * @param date Date to get the week start from.
 * @param weekStartsOn Index of the first day of the week.
 */
export const getWeekStart = (date: Date, weekStartsOn: WeekdayIndex = 0): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  const dayOfWeek = getDay(date);
  const dayOffset = dayOfWeek < weekStartsOn ? 7 : 0;
  const dayDiff = dayOfWeek + dayOffset - weekStartsOn;
  // Create a new date with the date's year and month
  // on the day of month minus the adjusted day difference based on the week start at 00:00.
  return new Date(year, month, dayOfMonth - dayDiff, 0, 0, 0, 0);
};

/**
 * Gets the end of the week from date.
 *
 * @param date Date to get the week end from.
 * @param weekStartsOn Index of the first day of the week.
 */
export const getWeekEnd = (date: Date, weekStartsOn: WeekdayIndex = 0): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const dayOffset = dayOfWeek < weekStartsOn ? -7 : 0;
  const dayDiff = 6 + dayOffset - (dayOfWeek - weekStartsOn);
  // Create a new date with the date's year and month
  // on the day of month plus the adjusted day difference based on the week start at 23:59.
  return new Date(year, month, dayOfMonth + dayDiff, 23, 59, 59, 999);
};

/**
 * Gets the start of the day from given date.
 *
 * @param date Date to get the start of the day from.
 */
export const getDayStart = (date: Date): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  return new Date(year, month, dayOfMonth, 0, 0, 0, 0);
};

/**
 * Gets the end of the day from given date.
 *
 * @param date Date to get the end of the dat from.
 */
export const getDayEnd = (date: Date): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  return new Date(year, month, dayOfMonth, 23, 59, 59, 999);
};

/**
 * Gets the difference in calendar weeks between two dates.
 *
 * @param left Left date to get the difference from.
 * @param right Right date to get the difference from.
 * @param weekStartsOn Index of the first day of the week.
 */
export const getDifferenceInCalendarWeeks = (left: Date, right: Date, weekStartsOn: WeekdayIndex = 0): number => {
  const leftWeekStart = getWeekStart(left, weekStartsOn);
  const rightWeekStart = getWeekStart(right, weekStartsOn);
  const oneWeek = 60 * 60 * 24 * 7 * 1000;
  // Calculate the difference in miliseconds then get back the weeks.
  return Math.round(Math.abs(leftWeekStart.getTime() - rightWeekStart.getTime()) / oneWeek);
};

/**
 * Is the given date month even?
 *
 * @param date Date to check.
 */
export const isMonthEven = (date: Date): boolean => {
  const month = getMonth(date);
  // Use the actual human format to calculate the even months,
  // starts counting from 1 insted of 0.
  return (month + 1) % 2 === 0;
};

/**
 * Is the given date the first day of the month?
 *
 * @param date Date to check.
 */
export const isFirstDayOfMonth = (date: Date): boolean => getDate(date) === 1;

/**
 * Is the given date the lsat day of the month?
 *
 * @param date Date to check.
 */
export const isLastDayOfMonth = (date: Date): boolean => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  const endOfDay = new Date(year, month, dayOfMonth, 23, 59, 59, 999).getTime();
  const endOfMonth = getMonthEnd(date).getTime();
  return endOfDay === endOfMonth;
};

/**
 * Is the given date on weekend?
 *
 * @param date Date to check.
 */
export const isWeekend = (date: Date): boolean => getDay(date) % 6 === 0;

/**
 * Is the given date today?
 *
 * @param date Date to check.
 */
export const isToday = (date: Date): boolean => getDayStart(date).getTime() === new Date(new Date().setHours(0, 0, 0, 0)).getTime();

/**
 * Is the given date between the given start and end date?
 *
 * @param date Date to check.
 * @param start Interval start date to check.
 * @param end Interval end date to check.
 */
export const isWithinInterval = (date: Date, start: Date, end: Date): boolean => {
  const timestamp = getTimestamp(date);
  const startTimestamp = getTimestamp(start);
  const endTimestamp = getTimestamp(end);

  if (endTimestamp <= startTimestamp) throw new RangeError(`Start date (${start}) must be before end date (${end}).`);
  return startTimestamp <= timestamp && timestamp <= endTimestamp;
};

/**
 * Is given date on same day as compare date?
 *
 * @param date Date to check.
 * @param dateToCompare Date to compare to.
 */
export const isSameDay = (date: Date, dateToCompare: Date): boolean => {
  const timestamp = getTimestamp(getDayStart(date));
  const timestampToCompare = getTimestamp(getDayStart(dateToCompare));
  return timestamp === timestampToCompare;
};

/**
 * Adds the number of days to the given date.
 *
 * @param date Date to add the number of days to.
 * @param numberOfDays Number of weeks to be added.
 */
export const addDays = (date: Date, numberOfDays: number): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  return new Date(new Date(year, month, dayOfMonth).setDate(dayOfMonth + numberOfDays));
};

/**
 * Adds the number of weeks to the given date.
 *
 * @param date Date to add the number of weeks to.
 * @param numberOfWeeks Number of weeks to be added.
 */
export const addWeeks = (date: Date, numberOfWeeks: number): Date => addDays(date, numberOfWeeks * 7);

/**
 * Returns the local formatted month name.
 *
 * @param date Date to format.
 * @param locale Language whose formatting conventions should be used.
 */
export const formatMonth = (date: Date, locale = 'default'): string =>
  date.toLocaleString(locale, {
    month: 'short',
  });

/**
 * Returns the local formatted day with two digits from given date.
 *
 * @param date Date to format.
 * @param locale Language whose formatting conventions should be used.
 */
export const formatDate = (date: Date, locale = 'default'): string =>
  date.toLocaleString(locale, {
    day: '2-digit',
  });

/**
 * Returns the local formatted day name from given date.
 *
 * @param date Date to format.
 * @param locale Language whose formatting conventions should be used.
 */
export const formatWeekday = (date: Date, locale = 'default'): string =>
  date.toLocaleString(locale, {
    weekday: 'short',
  });
