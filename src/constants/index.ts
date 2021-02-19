/**
 * Default indexes of the weekdays start from Sunday (0).
 */
export const WEEKDAY_KEYS = [
  0, // Sunday
  1, // Monday
  2, // Tuesday
  3, // Wednesday
  4, // Thursday
  5, // Friday
  6, // Saturday
];

/**
 * Default display names for weekdays.
 */
export const WEEKDAYS = [
  { key: 0, short: 'Sun', long: 'Sunday' },
  { key: 1, short: 'Mon', long: 'Monday' },
  { key: 2, short: 'Tue', long: 'Tuesday' },
  { key: 3, short: 'Wed', long: 'Wednesday' },
  { key: 4, short: 'Thu', long: 'Thursday' },
  { key: 5, short: 'Fri', long: 'Friday' },
  { key: 6, short: 'Sat', long: 'Saturday' },
];

export default {
  WEEKDAY_KEYS,
  WEEKDAYS,
};
