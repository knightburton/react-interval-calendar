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
import { WeekdayIndex, CalendarTuple, HeaderCellType, WeeksHeight, BodyCellType } from '../types';

/**
 * Returns the desired date attributes based on the passed weeks and days.
 *
 * @param startDate Date to calculate the actual date from.
 * @param numberOfWeek Week different between start and desired date.
 * @param numberOfDay Day different between the week start and desired date.
 * @param locale Locale to format the month and day labels.
 */
export const getCellAttributes = (startDate: Date, numberOfWeek: number, numberOfDay: number, locale?: string): BodyCellType => {
  const date = addWeeks(addDays(startDate, numberOfDay), numberOfWeek);

  return {
    key: `${numberOfWeek}-${numberOfDay}`,
    date,
    day: formatDate(date, locale, { day: 'numeric' }),
    month: formatDate(date, locale, { month: 'numeric' }),
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
 * Whcih are the full week start and end dates with the number of weeks between.
 *
 * @param startDate Start date of the selected interval.
 * @param endDate End date of the seleccted interval.
 * @param weekStartsOn Index of the first day of the week.
 */
export const getCalendarBaseAttributes = (startDate?: Date, endDate?: Date, weekStartsOn: WeekdayIndex = 0): CalendarTuple => {
  if (!startDate || !endDate) return [null, null, 0];
  const monthStart = getMonthStart(startDate);
  const monthEnd = getMonthEnd(endDate);
  const alfa = getWeekStart(monthStart, weekStartsOn);
  const omega = getWeekEnd(monthEnd, weekStartsOn);
  const weeks = getDifferenceInCalendarWeeks(omega, alfa, weekStartsOn);

  return [alfa, omega, weeks];
};

/**
 * Returns the header weekdays dates and format those based on locale.
 *
 * @param weekStartsOn Index of the first day of the week.
 * @param locale Locale to format the day labels.
 */
export const getHeaderWeekdays = (weekStartsOn: WeekdayIndex = 0, locale?: string): HeaderCellType[] => {
  const start = getWeekStart(new Date(), weekStartsOn);
  return Array.from(Array(7).keys()).map(day => {
    const date = addDays(start, day);
    return {
      id: day,
      short: formatDate(date, locale, { weekday: 'short' }),
      long: formatDate(date, locale, { weekday: 'long' }),
      narrow: formatDate(date, locale, { weekday: 'narrow' }),
    };
  });
};

/**
 * Returns the height of the weeks section based the header visibility.
 *
 * @param header Is the header visible?
 * @param weekdays Are the weekdays visible?
 * @param height Overall height to calculate the weeks height from.
 */
export const getWeeksHeight = (header: boolean, weekdays: boolean, height: WeeksHeight): WeeksHeight => {
  // If the header is not visible then there is no point to reduce the weeks height.
  if (!header) return height;
  // If the header weekdays are visible then substract the height of it from the given height.
  // Given height - size * global spacing value.
  if (weekdays && typeof height === 'number') return height - 5 * 8;
  // If the hright is not a number but we have the weekdays enabled let the css do the work with calc funtion.
  if (weekdays) return `calc(${height} - ${5 * 8}px)`;
  // Otherwise just pass the height.
  return height;
};

export const getBodyCellContent = (cell: BodyCellType, locale = 'default'): string => {
  if (cell.isFirstDayOfYear) return formatDate(cell.date, locale, { day: 'numeric', month: 'short', year: 'numeric' });
  if (cell.isFirstDayOfMonth) return formatDate(cell.date, locale, { day: 'numeric', month: 'short' });
  return cell.day;
};
