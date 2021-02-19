import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  getDifferenceInCalendarWeeks,
  addDays,
  addWeeks,
  isMonthEven,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isToday,
  isWeekend,
  formatDate,
} from '../utils/date';
import { Day } from '../interfaces/IntervalCalendarDay.interface';

/**
 * Generates the desired date attributes based on the passed weeks and days.
 *
 * @param startDate Date to calculate the actual date from.
 * @param numberOfWeek Week different between start and desired date.
 * @param numberOfDay Day different between the week start and desired date.
 */
export const generateDayAttributes = (startDate: Date, numberOfWeek: number, numberOfDay: number): Day => {
  const date = addWeeks(addDays(startDate, numberOfDay), numberOfWeek);

  return {
    key: `${numberOfWeek}-${numberOfDay}`,
    date,
    display: formatDate(date),
    isMonthEven: isMonthEven(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date),
  };
};

/**
 * Generates the base attributes of the calendar.
 * Whcih are the full week start and end dates with the number of weeks between.
 *
 * @param startDate Start date of the selected interval.
 * @param endDate End date of the seleccted interval.
 * @param weekStartsOn Index of the first day of the week.
 */
export const generateCalendarBaseAttributes = (startDate?: Date, endDate?: Date, weekStartsOn: number = 0): CalendarTuple => {
  if (!startDate || !endDate) return [undefined, undefined, 0];
  const monthStart = getMonthStart(startDate);
  const monthEnd = getMonthEnd(endDate);
  const alfa = getWeekStart(monthStart, weekStartsOn);
  const omega = getWeekEnd(monthEnd, weekStartsOn);
  const weeks = getDifferenceInCalendarWeeks(omega, alfa, weekStartsOn);

  return [alfa, omega, weeks];
};
