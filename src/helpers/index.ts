import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  getDifferenceInCalendarWeeks,
  addDays,
  addWeeks,
  isFirstDayOfYear,
  isMonthEven,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isToday,
  isWeekend,
  formatDate,
} from '../utils/date';
import { WeekdayIndex, CalendarTuple, HeaderCellData, BodyCellData } from '../types';

/**
 * Returns the desired date attributes based on the passed weeks and days.
 *
 * @param startDate Date to calculate the actual date from.
 * @param numberOfWeek Week different between start and desired date.
 * @param numberOfDay Day different between the week start and desired date.
 * @param locale Locale to format the month and day labels.
 */
export const getCellAttributes = (startDate: Date, numberOfWeek: number, numberOfDay: number, locale?: string): BodyCellData => {
  const date = addWeeks(addDays(startDate, numberOfDay), numberOfWeek);

  return {
    key: `${numberOfWeek}-${numberOfDay}`,
    date,
    day: formatDate(date, locale, { day: '2-digit' }),
    month: formatDate(date, locale, { month: 'short' }),
    year: formatDate(date, locale, { year: 'numeric' }),
    isFirstDayOfYear: isFirstDayOfYear(date),
    isMonthEven: isMonthEven(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date),
  };
};

/**
 * Returns the base attributes of the calendar.
 * Which are the full week start and end dates with the number of weeks between.
 *
 * @param startDate Start date of the selected interval.
 * @param endDate End date of the selected interval.
 * @param weekStartsOn Index of the first day of the week.
 */
export const getCalendarBaseAttributes = (startDate?: Date, endDate?: Date, weekStartsOn: WeekdayIndex = 0): CalendarTuple => {
  if (!startDate || !endDate) return [null, null, 0, 0];
  const monthStart = getMonthStart(startDate);
  const monthEnd = getMonthEnd(endDate);
  const alfa = getWeekStart(monthStart, weekStartsOn);
  const omega = getWeekEnd(monthEnd, weekStartsOn);
  const weeks = getDifferenceInCalendarWeeks(omega, alfa, weekStartsOn);
  const weeksToday = getDifferenceInCalendarWeeks(alfa, new Date(), weekStartsOn);

  return [alfa, omega, weeks, weeksToday];
};

/**
 * Returns the header weekdays dates and format those based on locale.
 *
 * @param weekStartsOn Index of the first day of the week.
 * @param locale Locale to format the day labels.
 */
export const getHeaderWeekdays = (weekStartsOn: WeekdayIndex = 0, locale?: string): HeaderCellData[] => {
  const start = getWeekStart(new Date(), weekStartsOn);
  return Array.from(Array(7).keys()).map(day => {
    const date = addDays(start, day);
    return {
      key: day,
      short: formatDate(date, locale, { weekday: 'short' }),
      long: formatDate(date, locale, { weekday: 'long' }),
      narrow: formatDate(date, locale, { weekday: 'narrow' }),
    };
  });
};

/**
 * Return the actual body cell formatted date as a string to render.
 *
 * @param cell day data of the body cell.
 * @param locale Locale to format the return.
 */
export const getBodyCellContent = (cell: BodyCellData, locale = 'default'): string => {
  if (cell.isFirstDayOfYear) return formatDate(cell.date, locale, { day: '2-digit', month: 'short', year: 'numeric' });
  if (cell.isFirstDayOfMonth) return formatDate(cell.date, locale, { day: '2-digit', month: 'short' });
  return cell.day;
};
