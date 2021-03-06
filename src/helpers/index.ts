import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  getDifferenceInCalendarWeeks,
  getYear,
  addDays,
  addWeeks,
  isMonthEven,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isToday,
  isWeekend,
  isWithinInterval,
  isSameDay,
  formatMonth,
  formatDate,
  formatWeekday,
} from '../utils/date';
import { convertColorToRgba } from '../utils/color';
import { Day } from '../interfaces/IntervalCalendarDay.interface';
import { HIGHLIGHT_COLORS } from '../constants/default-colors';
import { HighlightedItem, ThemeOption, WeekdayIndex, CalendarTuple, HeaderWeekday, WeeksHeight } from '../types';

/**
 * Returns the desired date attributes based on the passed weeks and days.
 *
 * @param startDate Date to calculate the actual date from.
 * @param numberOfWeek Week different between start and desired date.
 * @param numberOfDay Day different between the week start and desired date.
 * @param highlighted List of highlighted intervals.
 * @param highlightedColorAlpha Number of alpha level in rgba color.
 * @param theme Theme sof the calendar to adjust highlight colors.
 * @param locale Locale to format the month and day labels.
 */
export const getDayAttributes = (
  startDate: Date,
  numberOfWeek: number,
  numberOfDay: number,
  highlighted: HighlightedItem[],
  highlightedColorAlpha: number,
  theme: ThemeOption,
  locale?: string,
): Day => {
  const date = addWeeks(addDays(startDate, numberOfDay), numberOfWeek);
  const highlightedData = highlighted.find(item => isWithinInterval(date, item.start, item.end));

  return {
    key: `${numberOfWeek}-${numberOfDay}`,
    date,
    yearLabel: getYear(date),
    monthLabel: formatMonth(date, locale),
    dayLabel: formatDate(date, locale),
    isMonthEven: isMonthEven(date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isHighlighted: !!highlightedData,
    isFirstOfHighlighted: !!highlightedData && isSameDay(highlightedData.start, date),
    isLastOfHighlighted: !!highlightedData && isSameDay(highlightedData.end, date),
    highlightColor: highlightedData ? convertColorToRgba(highlightedData.color || HIGHLIGHT_COLORS[theme.toUpperCase()], highlightedColorAlpha) : undefined,
    highlightId: highlightedData?.id || highlightedData?.key,
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
export const getHeaderWeekdays = (weekStartsOn: WeekdayIndex = 0, locale?: string): HeaderWeekday[] => {
  const start = getWeekStart(new Date(), weekStartsOn);
  return Array.from(Array(7).keys()).map(day => ({
    key: day,
    label: formatWeekday(addDays(start, day), locale),
  }));
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
