import * as utils from '../../utils/date';

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
    expect(utils.getYear(new Date(1609455600000))).toEqual(2021);
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
    expect(utils.getTimestamp(new Date(2021, 0, 1))).toEqual(1609455600000);
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
