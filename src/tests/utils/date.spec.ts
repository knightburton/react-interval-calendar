import * as utils from '../../utils/date';

const mockError = (date: string, type: string) => new Error(`${date} cannot be used to get the ${type} from.`);

describe('getYear', () => {
  it('returns valid year from new Date with proper args', () => {
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
  it('returns valid month from new Date with proper args', () => {
    expect(utils.getMonth(new Date(2021, 0, 1))).toEqual(0);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonth(<Date>{})).toThrow(mockError('[object Object]', 'month'));
  });
});

describe('getDate', () => {
  it('returns valid date from new Date with proper args', () => {
    expect(utils.getDate(new Date(2021, 0, 1))).toEqual(1);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDate(<Date>{})).toThrow(mockError('[object Object]', 'day of the month'));
  });
});

describe('getDay', () => {
  it('returns valid day from new Date with proper args', () => {
    expect(utils.getDay(new Date(2021, 0, 1))).toEqual(5);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getDay(<Date>{})).toThrow(mockError('[object Object]', 'day of the week'));
  });
});

describe('getTimestamp', () => {
  it('returns valid timestamp from new Date with proper args', () => {
    expect(utils.getTimestamp(new Date(2021, 0, 1))).toEqual(1609455600000);
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getTimestamp(<Date>{})).toThrow(mockError('[object Object]', 'timestamp'));
  });
});

describe('getMonthStart', () => {
  it('returns valid start of month fromnew Date with proper args', () => {
    expect(utils.getMonthStart(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonthStart(<Date>{})).toThrow(Error);
  });
});

describe('getMonthEnd', () => {
  it('returns valid end of month from new Date with proper args', () => {
    expect(utils.getMonthEnd(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 31, 23, 59, 59, 999));
  });

  it('throws error because of object as Date arg', () => {
    expect(() => utils.getMonthEnd(<Date>{})).toThrow(Error);
  });
});
