import * as utils from '../../src/utils/date';

const mockError = (date: string, type: string) => new Error(`${date} cannot be used to get the ${type} from.`);

describe('getYear', () => {
  it('returns valid year from proper date', () => {
    expect(utils.getYear(new Date(2021, 0, 1))).toEqual(2021);
  });

  it('returns valid year from new Date with string arg', () => {
    expect(utils.getYear(new Date('2021-01-01'))).toEqual(2021);
  });

  it('returns valid year from new Date with string arg in CET format', () => {
    expect(utils.getYear(new Date('Thu Feb 25 2021 21:50:16 GMT+0100 (Central European Standard Time)'))).toEqual(2021);
  });

  it('returns valid year from new Date with string arg short CET format', () => {
    expect(utils.getYear(new Date('Thu Feb 25 2021'))).toEqual(2021);
  });

  it('returns valid year from new Date with string arg in UTC format', () => {
    expect(utils.getYear(new Date('Thu, 25 Feb 2021 20:51:10 GMT'))).toEqual(2021);
  });

  it('returns valid year from new Date with string arg in short UTC format', () => {
    expect(utils.getYear(new Date('Thu, 25 Feb 2021'))).toEqual(2021);
  });

  it('returns valid year from new Date with timestamp arg', () => {
    expect(utils.getYear(new Date(1616520867059))).toEqual(2021);
  });

  it('returns valid year from number', () => {
    expect(utils.getYear(2021)).toEqual(2021);
  });

  it('returns valid year from string', () => {
    expect(utils.getYear('2021-01-01')).toEqual(2021);
  });

  it('returns valid year from string only with year', () => {
    expect(utils.getYear('2021')).toEqual(2021);
  });

  it('returns valid year from string with full format', () => {
    expect(utils.getYear('2021-01-01 12:00:21')).toEqual(2021);
  });

  it('throws error because of invalid string', () => {
    expect(() => utils.getYear('twenty-twenty')).toThrow(mockError('twenty-twenty', 'year'));
  });
});

describe('getMonth', () => {
  it('returns valid month from proper date', () => {
    expect(utils.getMonth(new Date(2021, 0, 1))).toEqual(0);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonth(<Date>{})).toThrow(mockError('[object Object]', 'month'));
  });
});

describe('getDate', () => {
  it('returns valid date from proper date', () => {
    expect(utils.getDate(new Date(2021, 0, 1))).toEqual(1);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDate(<Date>{})).toThrow(mockError('[object Object]', 'day of the month'));
  });
});

describe('getDay', () => {
  it('returns valid day from proper date', () => {
    expect(utils.getDay(new Date(2021, 0, 1))).toEqual(5);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDay(<Date>{})).toThrow(mockError('[object Object]', 'day of the week'));
  });
});

describe('getTimestamp', () => {
  it('returns valid timestamp from proper date', () => {
    expect(utils.getTimestamp(new Date(1609455600000))).toEqual(1609455600000);
  });

  it('returns valid timestamp from proper date that is already timestamp', () => {
    expect(utils.getTimestamp(1609455600000)).toEqual(1609455600000);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getTimestamp(<Date>{})).toThrow(mockError('[object Object]', 'timestamp'));
  });
});

describe('getMonthStart', () => {
  it('returns valid start of month fromproper date', () => {
    expect(utils.getMonthStart(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonthStart(<Date>{})).toThrow(Error);
  });
});

describe('getMonthEnd', () => {
  it('returns valid end of month from proper date', () => {
    expect(utils.getMonthEnd(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 31, 23, 59, 59, 999));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonthEnd(<Date>{})).toThrow(Error);
  });
});

describe('getWeekStart', () => {
  it('returns valid start of week from proper date and default weekStartOn', () => {
    expect(utils.getWeekStart(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 10, 0, 0, 0, 0));
  });

  it('returns valid start of week from proper date and weekStartOn equal 1', () => {
    expect(utils.getWeekStart(new Date(2021, 0, 11), 1)).toEqual(new Date(2021, 0, 11, 0, 0, 0, 0));
  });

  it('returns valid start of week from proper date and weekStartOn equal 6', () => {
    expect(utils.getWeekStart(new Date(2021, 0, 11), 6)).toEqual(new Date(2021, 0, 9, 0, 0, 0, 0));
  });

  it('returns valid start of week from proper date and weekStartOn equal 1 - offset true branch', () => {
    expect(utils.getWeekStart(new Date(2021, 0, 10), 6)).toEqual(new Date(2021, 0, 9, 0, 0, 0, 0));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getWeekStart(<Date>{})).toThrow(Error);
  });
});

describe('getWeekEnd', () => {
  it('returns valid end of week from proper date and default weekStartOn', () => {
    expect(utils.getWeekEnd(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 16, 23, 59, 59, 999));
  });

  it('returns valid end of week from proper date and weekStartOn equal 1', () => {
    expect(utils.getWeekEnd(new Date(2021, 0, 11), 1)).toEqual(new Date(2021, 0, 17, 23, 59, 59, 999));
  });

  it('returns valid end of week from proper date and weekStartOn equal 6', () => {
    expect(utils.getWeekEnd(new Date(2021, 0, 11), 6)).toEqual(new Date(2021, 0, 15, 23, 59, 59, 999));
  });

  it('returns valid end of week from proper date and weekStartOn equal 1 - offset true branch', () => {
    expect(utils.getWeekEnd(new Date(2021, 0, 10), 6)).toEqual(new Date(2021, 0, 15, 23, 59, 59, 999));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getWeekEnd(<Date>{})).toThrow(Error);
  });
});

describe('getDayStart', () => {
  it('returns valid start of day from proper date', () => {
    expect(utils.getDayStart(new Date(2021, 0, 11, 12, 11, 32, 543))).toEqual(new Date(2021, 0, 11, 0, 0, 0, 0));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDayStart(<Date>{})).toThrow(Error);
  });
});

describe('getDayEnd', () => {
  it('returns valid start of day from proper date', () => {
    expect(utils.getDayEnd(new Date(2021, 0, 11, 12, 11, 32, 543))).toEqual(new Date(2021, 0, 11, 23, 59, 59, 999));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDayEnd(<Date>{})).toThrow(Error);
  });
});

describe('getDifferenceInCalendarDays', () => {
  it('returns valid start of day from proper dates', () => {
    expect(utils.getDifferenceInCalendarDays(new Date(2021, 0, 10), new Date(2021, 0, 14))).toEqual(4);
  });

  it('throws error because of object as Date first arg', () => {
    expect(() => utils.getDifferenceInCalendarDays(<Date>{}, new Date(2021, 1, 11))).toThrow(Error);
  });

  it('throws error because of object as Date second arg', () => {
    expect(() => utils.getDifferenceInCalendarDays(new Date(2021, 1, 11), <Date>{})).toThrow(Error);
  });

  it('throws error because of object as Date args', () => {
    expect(() => utils.getDifferenceInCalendarDays(<Date>{}, <Date>{})).toThrow(Error);
  });
});

describe('getDifferenceInCalendarWeeks', () => {
  it('returns valid start of day from proper dates and default weekStartsOn', () => {
    expect(utils.getDifferenceInCalendarWeeks(new Date(2021, 0, 10), new Date(2021, 1, 11))).toEqual(4);
  });

  it('returns valid start of day from proper dates and weekStartsOn equal 1', () => {
    expect(utils.getDifferenceInCalendarWeeks(new Date(2021, 0, 9), new Date(2021, 1, 11), 1)).toEqual(5);
  });

  it('throws error because of object as Date first arg', () => {
    expect(() => utils.getDifferenceInCalendarWeeks(<Date>{}, new Date(2021, 1, 11))).toThrow(Error);
  });

  it('throws error because of object as Date second arg', () => {
    expect(() => utils.getDifferenceInCalendarWeeks(new Date(2021, 1, 11), <Date>{})).toThrow(Error);
  });

  it('throws error because of object as Date args', () => {
    expect(() => utils.getDifferenceInCalendarWeeks(<Date>{}, <Date>{})).toThrow(Error);
  });
});

describe('isMonthEven', () => {
  it('returns false from proper date', () => {
    expect(utils.isMonthEven(new Date(2021, 0, 11))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isMonthEven(new Date(2021, 1, 11))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isMonthEven(<Date>{})).toThrow(Error);
  });
});

describe('isFirstDayOfMonth', () => {
  it('returns false from proper date', () => {
    expect(utils.isFirstDayOfMonth(new Date(2021, 0, 11))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isFirstDayOfMonth(new Date(2021, 0, 1))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isFirstDayOfMonth(<Date>{})).toThrow(Error);
  });
});

describe('isLastDayOfMonth', () => {
  it('returns false from proper date', () => {
    expect(utils.isLastDayOfMonth(new Date(2021, 0, 11))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isLastDayOfMonth(new Date(2021, 0, 31))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isLastDayOfMonth(<Date>{})).toThrow(Error);
  });
});

describe('isWeekend', () => {
  it('returns false from proper date', () => {
    expect(utils.isWeekend(new Date(2021, 0, 11))).toEqual(false);
  });

  it('returns true from proper date (saturday)', () => {
    expect(utils.isWeekend(new Date(2021, 0, 23))).toEqual(true);
  });

  it('returns true from proper date (sunday)', () => {
    expect(utils.isWeekend(new Date(2021, 0, 24))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isWeekend(<Date>{})).toThrow(Error);
  });
});

describe('isToday', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 0, 11));
  });

  it('returns false from proper date', () => {
    expect(utils.isToday(new Date(2021, 0, 22))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isToday(new Date(2021, 0, 11))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isToday(<Date>{})).toThrow(Error);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});

describe('isWithinInterval', () => {
  it('returns false from proper dates', () => {
    expect(utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 1, 11), new Date(2021, 2, 11))).toEqual(false);
  });

  it('returns true from proper dates (on start)', () => {
    expect(utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 0, 11), new Date(2021, 0, 13))).toEqual(true);
  });

  it('returns true from proper dates (on end)', () => {
    expect(utils.isWithinInterval(new Date(2021, 0, 13), new Date(2021, 0, 11), new Date(2021, 0, 13))).toEqual(true);
  });

  it('returns true from proper dates (middle)', () => {
    expect(utils.isWithinInterval(new Date(2021, 0, 12), new Date(2021, 0, 11), new Date(2021, 0, 13))).toEqual(true);
  });

  it('returns true from proper dates (one day interval)', () => {
    expect(utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 0, 11), new Date(2021, 0, 11, 22, 22, 22, 22))).toEqual(true);
  });

  it('throws error because of start date after end date', () => {
    expect(() => utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 0, 12), new Date(2021, 0, 11))).toThrow(RangeError);
  });

  it('throws error because of start date equal end date', () => {
    expect(() => utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 0, 12), new Date(2021, 0, 11))).toThrow(RangeError);
  });

  it('throws error because of object as Date first arg', () => {
    expect(() => utils.isWithinInterval(<Date>{}, new Date(2021, 0, 11), new Date(2021, 0, 13))).toThrow(Error);
  });

  it('throws error because of object as Date second arg', () => {
    expect(() => utils.isWithinInterval(new Date(2021, 0, 11), <Date>{}, new Date(2021, 0, 13))).toThrow(Error);
  });

  it('throws error because of object as Date third arg', () => {
    expect(() => utils.isWithinInterval(new Date(2021, 0, 11), new Date(2021, 0, 11), <Date>{})).toThrow(Error);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isWithinInterval(<Date>{}, <Date>{}, <Date>{})).toThrow(Error);
  });
});

describe('isFirstDayOfYear', () => {
  it('returns false from proper date', () => {
    expect(utils.isFirstDayOfYear(new Date(2021, 0, 11))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isFirstDayOfYear(new Date(2021, 0, 1))).toEqual(true);
  });

  it('returns true from proper date (milisecundum precision)', () => {
    expect(utils.isFirstDayOfYear(new Date(2021, 0, 1, 0, 0, 0, 0))).toEqual(true);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.isFirstDayOfYear(<Date>{})).toThrow(Error);
  });
});

describe('isSameDay', () => {
  it('returns false from proper date', () => {
    expect(utils.isSameDay(new Date(2021, 0, 11), new Date(2021, 0, 12))).toEqual(false);
  });

  it('returns true from proper date', () => {
    expect(utils.isSameDay(new Date(2021, 0, 11), new Date(2021, 0, 11))).toEqual(true);
  });

  it('returns true from proper date (milisecundum precision)', () => {
    expect(utils.isSameDay(new Date(2021, 0, 11, 0, 0, 0, 123), new Date(2021, 0, 11, 0, 0, 0, 124))).toEqual(true);
  });

  it('throws error because of object as Date first arg', () => {
    expect(() => utils.isSameDay(<Date>{}, new Date(2021, 0, 11))).toThrow(Error);
  });

  it('throws error because of object as Date second arg', () => {
    expect(() => utils.isSameDay(new Date(2021, 0, 11), <Date>{})).toThrow(Error);
  });

  it('throws error because of object as Date args', () => {
    expect(() => utils.isSameDay(<Date>{}, <Date>{})).toThrow(Error);
  });
});

describe('addDays', () => {
  it('returns a new date that greater by 1 day', () => {
    expect(utils.addDays(new Date(2021, 0, 11), 1)).toEqual(new Date(2021, 0, 12));
  });

  it('returns a new date that greater by 25 day', () => {
    expect(utils.addDays(new Date(2021, 0, 11), 25)).toEqual(new Date(2021, 1, 5));
  });

  it('returns a new date that less by 6 day', () => {
    expect(utils.addDays(new Date(2021, 0, 11), -6)).toEqual(new Date(2021, 0, 5));
  });

  it('throws error because of object as Date args', () => {
    expect(() => utils.addDays(<Date>{}, 8)).toThrow(Error);
  });
});

describe('addWeeks', () => {
  it('returns a new date that greater by 1 week', () => {
    expect(utils.addWeeks(new Date(2021, 0, 11), 1)).toEqual(new Date(2021, 0, 18));
  });

  it('returns a new date that greater by 25 week', () => {
    expect(utils.addWeeks(new Date(2021, 0, 11), 6)).toEqual(new Date(2021, 1, 22));
  });

  it('returns a new date that less by 6 week', () => {
    expect(utils.addWeeks(new Date(2021, 0, 11), -6)).toEqual(new Date(2020, 10, 30));
  });

  it('throws error because of object as Date args', () => {
    expect(() => utils.addWeeks(<Date>{}, 2)).toThrow(Error);
  });
});

describe('formatMonth', () => {
  const date = new Date(2021, 2, 22);
  const toLocalStringSpy = jest.spyOn(date, 'toLocaleString');

  it('returns a locale formatted month name in default', () => {
    utils.formatMonth(date);
    expect(toLocalStringSpy).toHaveBeenCalledWith('default', { month: 'short' });
  });

  it('returns a locale formatted month name in en-US', () => {
    utils.formatMonth(date, 'en-US');
    expect(toLocalStringSpy).toHaveBeenCalledWith('en-US', { month: 'short' });
  });

  it('returns a locale formatted month name in hu-HU', () => {
    utils.formatMonth(date, 'hu-HU');
    expect(toLocalStringSpy).toHaveBeenCalledWith('hu-HU', { month: 'short' });
  });

  afterAll(() => {
    toLocalStringSpy.mockClear();
  });
});

describe('formatDate', () => {
  const date = new Date(2021, 2, 22);
  const toLocalStringSpy = jest.spyOn(date, 'toLocaleString');

  it('returns a locale formatted date name in default', () => {
    utils.formatDate(date);
    expect(toLocalStringSpy).toHaveBeenCalledWith('default', { day: '2-digit' });
  });

  it('returns a locale formatted date name in en-US', () => {
    utils.formatDate(date, 'en-US');
    expect(toLocalStringSpy).toHaveBeenCalledWith('en-US', { day: '2-digit' });
  });

  it('returns a locale formatted date name in hu-HU', () => {
    utils.formatDate(date, 'hu-HU');
    expect(toLocalStringSpy).toHaveBeenCalledWith('hu-HU', { day: '2-digit' });
  });

  afterAll(() => {
    toLocalStringSpy.mockClear();
  });
});

describe('formatWeekday', () => {
  const date = new Date(2021, 2, 22);
  const toLocalStringSpy = jest.spyOn(date, 'toLocaleString');

  it('returns a locale formatted weekday name in default', () => {
    utils.formatWeekday(date);
    expect(toLocalStringSpy).toHaveBeenCalledWith('default', { weekday: 'short' });
  });

  it('returns a locale formatted weekday name in en-US', () => {
    utils.formatWeekday(date, 'en-US');
    expect(toLocalStringSpy).toHaveBeenCalledWith('en-US', { weekday: 'short' });
  });

  it('returns a locale formatted weekday name in hu-HU', () => {
    utils.formatWeekday(date, 'hu-HU');
    expect(toLocalStringSpy).toHaveBeenCalledWith('hu-HU', { weekday: 'short' });
  });

  afterAll(() => {
    toLocalStringSpy.mockClear();
  });
});
