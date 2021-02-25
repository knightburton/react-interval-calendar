import * as utils from './date';

const mockError = (date: string, type: string) => new Error(`${date} cannot be used to get the ${type} from.`);

describe('getYear', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getYear(new Date(2021, 0, 1))).toEqual(2021);
  });

  test('valid - new Date with string arg', () => {
    expect(utils.getYear(new Date('2021-01-01'))).toEqual(2021);
  });

  test('valid - new Date with string arg in CET format', () => {
    expect(utils.getYear(new Date('Thu Feb 25 2021 21:50:16 GMT+0100 (Central European Standard Time)'))).toEqual(2021);
  });

  test('valid - new Date with string arg short CET format', () => {
    expect(utils.getYear(new Date('Thu Feb 25 2021'))).toEqual(2021);
  });

  test('valid - new Date with string arg in UTC format', () => {
    expect(utils.getYear(new Date('Thu, 25 Feb 2021 20:51:10 GMT'))).toEqual(2021);
  });

  test('valid - new Date with string arg in short UTC format', () => {
    expect(utils.getYear(new Date('Thu, 25 Feb 2021'))).toEqual(2021);
  });

  test('valid - new Date with timestamp arg', () => {
    expect(utils.getYear(new Date(1609455600000))).toEqual(2021);
  });

  test('valid - number', () => {
    expect(utils.getYear(2021)).toEqual(2021);
  });

  test('valid - string', () => {
    expect(utils.getYear('2021-01-01')).toEqual(2021);
  });

  test('valid - string only with year', () => {
    expect(utils.getYear('2021')).toEqual(2021);
  });

  test('valid - string with full format', () => {
    expect(utils.getYear('2021-01-01 12:00:21')).toEqual(2021);
  });

  test('invalid - string', () => {
    expect(() => utils.getYear('twenty-twenty')).toThrow(mockError('twenty-twenty', 'year'));
  });
});

describe('getMonth', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getMonth(new Date(2021, 0, 1))).toEqual(0);
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getMonth(<Date>{})).toThrow(mockError('[object Object]', 'month'));
  });
});

describe('getDate', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getDate(new Date(2021, 0, 1))).toEqual(1);
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getDate(<Date>{})).toThrow(mockError('[object Object]', 'day of the month'));
  });
});

describe('getDay', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getDay(new Date(2021, 0, 1))).toEqual(5);
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getDay(<Date>{})).toThrow(mockError('[object Object]', 'day of the week'));
  });
});

describe('getTimestamp', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getTimestamp(new Date(2021, 0, 1))).toEqual(1609455600000);
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getTimestamp(<Date>{})).toThrow(mockError('[object Object]', 'timestamp'));
  });
});

describe('getMonthStart', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getMonthStart(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getMonthStart(<Date>{})).toThrow(Error);
  });
});

describe('getMonthEnd', () => {
  test('valid - new Date with proper args', () => {
    expect(utils.getMonthEnd(new Date(2021, 0, 11))).toEqual(new Date(2021, 0, 31, 23, 59, 59, 999));
  });

  test('invalid - object as Date', () => {
    expect(() => utils.getMonthEnd(<Date>{})).toThrow(Error);
  });
});
