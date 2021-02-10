/**
 * Gets year from date.
 *
 * @param {Date|number|string} date Date to get year from.
 */
export const getYear = date => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getFullYear();

  // example: 1612992784743
  if (typeof date === 'number') return date;

  // example: '2021-12-02'
  const year = parseInt(date, 10);
  if (typeof date === 'string' && !Number.isNaN(year)) return year;

  return null;
};

/**
 * Gets month from date.
 *
 * @param {Date} date Date to get month from.
 */
export const getMonth = date => {
  // example: Wed Feb 10 2021 22:26:31 GMT+0100 (Central European Standard Time)
  if (date instanceof Date) return date.getMonth();

  return null;
};
