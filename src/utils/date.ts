/**
 * Gets year from date.
 *
 * @param {Date|number|string} date Date to get year from.
 */
export const getYear = (date: Date | number | string): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getFullYear();

  // example: 1612992784743
  if (typeof date === 'number') return date;

  // example: '2021-12-02'
  const year = parseInt(date, 10);
  if (typeof date === 'string' && !Number.isNaN(year)) return year;

  throw new Error(`${date} cannot be used to get the year from.`);
};

/**
 * Gets month from date.
 *
 * @param {Date} date Date to get month from.
 */
export const getMonth = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getMonth();

  throw new Error(`${date} cannot be used to get the month from.`);
};

/**
 * Gets the day of the month.
 *
 * @param {Date} date Date to get the day of month from.
 */
export const getDate = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getDate();

  throw new Error(`${date} cannot be used to get the day of the month from.`);
};

/**
 * Gets the day of the week.
 *
 * @param {Date} date Date to get the day of the week from.
 */
export const getDay = (date: Date): number => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getDay();

  throw new Error(`${date} cannot be used to get the day of the week from.`);
};

/**
 * Gets the start of the month from date.
 *
 * @param {Date} date Date to get the start of the mont from.
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
 * @param {Date} date Date to get the end of the mont from.
 */
export const getMonthEnd = (date: Date): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  // Create a new date with the date's year and the next month
  // on the last day of the previous month at 00:00.
  // The day 0 means the last day of previous month.
  return new Date(year, month + 1, 0, 0, 0, 0, 0);
};

/**
 * Gets the start of the week from date.
 *
 * @param {Date} date Date to get the week start from.
 * @param {number} weekStartsOn Index of the first day of the week.
 */
export const getWeekStart = (date: Date, weekStartsOn: number = 0): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  const dayOfWeek = getDay(date);
  const dayOffset = dayOfWeek < weekStartsOn
    ? 7
    : 0;
  const dayDiff = dayOfWeek + dayOffset - weekStartsOn;
  // Create a new date with the date's year and month
  // on the day of month minus the adjusted day difference based on the week start at 00:00.
  return new Date(year, month, dayOfMonth - dayDiff, 0, 0, 0, 0);
};

/**
 * Gets the end of the week from date.
 *
 * @param {Date} date Date to get the week end from.
 * @param {number} weekStartsOn Index of the first day of the week.
 */
export const getWeekEnd = (date: Date, weekStartsOn: number = 0): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const dayOffset = dayOfWeek < weekStartsOn
    ? -7
    : 0;
  const dayDiff = 6 + dayOffset - (dayOfWeek - weekStartsOn);
  // Create a new date with the date's year and month
  // on the day of month plus the adjusted day difference based on the week start at 23:59.
  return new Date(year, month, dayOfMonth + dayDiff, 23, 59, 59, 999);
};

/**
 * Gets the difference in calendar weeks between two dates.
 *
 * @param {Date} left Left date to get the difference from.
 * @param {Date} right Right date to get the difference from.
 * @param {number} weekStartsOn Index of the first day of the week.
 */
export const getDifferenceInCalendarWeeks = (left: Date, right: Date, weekStartsOn: number = 0): number => {
  const leftWeekStart = getWeekStart(left, weekStartsOn);
  const rightWeekStart = getWeekStart(right, weekStartsOn);
  const oneWeek = 60 * 60 * 24 * 7 * 1000;
  // Calculate the difference in miliseconds then get back the weeks.
  return Math.round(Math.abs(leftWeekStart.getTime() - rightWeekStart.getTime()) / oneWeek);
};

/**
 * Is the given date month even?
 *
 * @param {Date} date Date to check.
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
 * @param {Date} date Date to check.
 */
export const isFirstDayOfMonth = (date: Date): boolean => getDate(date) === 1;

/**
 * Is the given date the lsat day of the month?
 *
 * @param {Date} date Date to check.
 */
export const isLastDayOfMonth = (date: Date): boolean => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  const endOfDay = new Date(year, month, dayOfMonth, 0, 0, 0, 0).getTime();
  const endOfMonth = getMonthEnd(date).getTime();
  return endOfDay === endOfMonth;
};

/**
 * Is the given date on weekend?
 *
 * @param {Date} date Date to check.
 */
export const isWeekend = (date: Date): boolean => getDay(date) % 6 === 0;

/**
 * Is the given date today?
 *
 * @param {Date} date Date to check.
 */
export const isToday = (date: Date): boolean => date.getTime() === new Date(new Date().setHours(0, 0, 0, 0)).getTime();

/**
 * Adds the number of days to the given date.
 *
 * @param {Date} date Date to add the number of days to.
 * @param {number} numberOfDays Number of weeks to be added.
 */
export const addDays = (date: Date, numberOfDays: number): Date => {
  const year = getYear(date);
  const month = getMonth(date);
  const dayOfMonth = getDate(date);
  return new Date(year, month, dayOfMonth + numberOfDays, 0, 0, 0, 0);
};

/**
 * Adds the number of weeks to the given date.
 *
 * @param {Date} date Date to add the number of weeks to.
 * @param {number} numberOfWeeks Number of weeks to be added.
 */
export const addWeeks = (date: Date, numberOfWeeks: number): Date => addDays(date, numberOfWeeks * 7);

/**
 * Returns the formatted date for Day component.
 *
 * @param {Date} date Date to format.
 */
export const formatDate = (date: Date): string => {
  const dayOfMonth = getDate(date);
  return dayOfMonth.toLocaleString('en-GB', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};
