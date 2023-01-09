import * as helpers from '../../src/helpers';
import { mockBodyCellAttributes } from '../testUtils';

describe('getDayAttributes', () => {
  it('returns all attributes for a normal day with default values', () => {
    expect(
      helpers.getCellAttributes(
        new Date(2021, 0, 1), // startDate
        2, // numberOfWeek
        3, // numberOfDay
        'default', // locale
      ),
    ).toEqual(
      mockBodyCellAttributes({
        key: '2-3',
        date: new Date(2021, 0, 18),
        year: '2021',
        month: 'Jan',
        day: '18',
      }),
    );
  });

  it('returns all attributes for a day that is the first day of the month', () => {
    expect(
      helpers.getCellAttributes(
        new Date(2021, 0, 1), // startDate
        0, // numberOfWeek
        0, // numberOfDay
        'en-GB', // locale
      ),
    ).toEqual(
      mockBodyCellAttributes({
        key: '0-0',
        date: new Date(2021, 0, 1),
        year: '2021',
        month: 'Jan',
        day: '01',
        isFirstDayOfMonth: true,
        isFirstDayOfYear: true,
      }),
    );
  });

  it('returns all attributes for a day that is the last day of the month', () => {
    expect(
      helpers.getCellAttributes(
        new Date(2021, 0, 1), // startDate
        4, // numberOfWeek
        2, // numberOfDay
        'en-GB', // locale
      ),
    ).toEqual(
      mockBodyCellAttributes({
        key: '4-2',
        date: new Date(2021, 0, 31),
        year: '2021',
        month: 'Jan',
        day: '31',
        isLastDayOfMonth: true,
        isWeekend: true,
      }),
    );
  });
});

describe('getCalendarBaseAttributes', () => {
  it('returns undefined values because of missing start date', () => {
    expect(helpers.getCalendarBaseAttributes(undefined, new Date(2021, 11, 11))).toEqual([null, null, 0]);
  });

  it('returns proper attributes when the week starts on Sunday', () => {
    expect(helpers.getCalendarBaseAttributes(new Date(2021, 2, 1), new Date(2021, 6, 31))).toEqual([
      new Date(2021, 1, 28, 0, 0, 0, 0), // alfa
      new Date(2021, 6, 31, 23, 59, 59, 999), // omega
      21, // number of weeks between alfa and omega
    ]);
  });

  it('returns proper attributes when the week starts on Monday', () => {
    expect(helpers.getCalendarBaseAttributes(new Date(2021, 2, 1), new Date(2021, 6, 31), 1)).toEqual([
      new Date(2021, 2, 1, 0, 0, 0, 0), // alfa
      new Date(2021, 7, 1, 23, 59, 59, 999), // omega
      21, // number of weeks between alfa and omega
    ]);
  });
});

describe('getHeaderWeekdays', () => {
  it('returns formatted labels array when week starts on Sunday', () => {
    expect(helpers.getHeaderWeekdays()).toEqual([
      { key: 0, short: 'Sun', long: 'Sunday', narrow: 'S' },
      { key: 1, short: 'Mon', long: 'Monday', narrow: 'M' },
      { key: 2, short: 'Tue', long: 'Tuesday', narrow: 'T' },
      { key: 3, short: 'Wed', long: 'Wednesday', narrow: 'W' },
      { key: 4, short: 'Thu', long: 'Thursday', narrow: 'T' },
      { key: 5, short: 'Fri', long: 'Friday', narrow: 'F' },
      { key: 6, short: 'Sat', long: 'Saturday', narrow: 'S' },
    ]);
  });

  it('returns formatted labels array when week starts on Monday', () => {
    expect(helpers.getHeaderWeekdays(1)).toEqual([
      { key: 0, short: 'Mon', long: 'Monday', narrow: 'M' },
      { key: 1, short: 'Tue', long: 'Tuesday', narrow: 'T' },
      { key: 2, short: 'Wed', long: 'Wednesday', narrow: 'W' },
      { key: 3, short: 'Thu', long: 'Thursday', narrow: 'T' },
      { key: 4, short: 'Fri', long: 'Friday', narrow: 'F' },
      { key: 5, short: 'Sat', long: 'Saturday', narrow: 'S' },
      { key: 6, short: 'Sun', long: 'Sunday', narrow: 'S' },
    ]);
  });
});

describe('getBodyCellContent', () => {
  it('returns the full date based on the first day of year condition with GB locale', () => {
    expect(helpers.getBodyCellContent(mockBodyCellAttributes({ date: new Date(2023, 0, 1), isFirstDayOfYear: true }), 'en-GB')).toEqual('01 Jan 2023');
  });

  it('returns the full date based on the first day of year condition with US locale', () => {
    expect(helpers.getBodyCellContent(mockBodyCellAttributes({ date: new Date(2023, 0, 1), isFirstDayOfYear: true }), 'en-US')).toEqual('Jan 01, 2023');
  });

  it('returns the date month and day based on the first day of mondth condition with US locale', () => {
    expect(helpers.getBodyCellContent(mockBodyCellAttributes({ date: new Date(2023, 1, 1), isFirstDayOfMonth: true }), 'en-US')).toEqual('Feb 01');
  });

  it('returns the date day based on a specific date with US locale', () => {
    expect(helpers.getBodyCellContent(mockBodyCellAttributes({ date: new Date(2023, 1, 9), day: '09' }), 'en-US')).toEqual('09');
  });

  it('returns the date day with default locale', () => {
    expect(helpers.getBodyCellContent(mockBodyCellAttributes())).toEqual('18');
  });
});
