import * as helpers from '../../helpers';
import { mockDayAttributes } from '../test-utils';
import { HIGHLIGHTED, HIGHLIGHTED_COLOR_ALPHA, THEME, LOCALE } from '../../constants/default-props';

describe('getDayAttributes', () => {
  it('returns all attributes for a normal day with default values', () => {
    expect(
      helpers.getDayAttributes(
        new Date(2021, 0, 1), // startDate
        2, // numberOfWeek
        3, // numberOfDay
        HIGHLIGHTED, // highlighted
        HIGHLIGHTED_COLOR_ALPHA, // highlightedColorAlpha
        THEME, // theme
        LOCALE, // locale
      ),
    ).toEqual(
      mockDayAttributes({
        key: '2-3',
        date: new Date(2021, 0, 18),
        yearLabel: 2021,
        monthLabel: 'Jan',
        dayLabel: '18',
      }),
    );
  });

  it('returns all attributes for a day that is the first day of the month', () => {
    expect(
      helpers.getDayAttributes(
        new Date(2021, 0, 1), // startDate
        0, // numberOfWeek
        0, // numberOfDay
        HIGHLIGHTED, // highlighted
        HIGHLIGHTED_COLOR_ALPHA, // highlightedColorAlpha
        THEME, // theme
        LOCALE, // locale
      ),
    ).toEqual(
      mockDayAttributes({
        key: '0-0',
        date: new Date(2021, 0, 1),
        yearLabel: 2021,
        monthLabel: 'Jan',
        dayLabel: '01',
        isFirstDayOfMonth: true,
      }),
    );
  });

  it('returns all attributes for a day that is the last day of the month', () => {
    expect(
      helpers.getDayAttributes(
        new Date(2021, 0, 1), // startDate
        4, // numberOfWeek
        2, // numberOfDay
        HIGHLIGHTED, // highlighted
        HIGHLIGHTED_COLOR_ALPHA, // highlightedColorAlpha
        THEME, // theme
        LOCALE, // locale
      ),
    ).toEqual(
      mockDayAttributes({
        key: '4-2',
        date: new Date(2021, 0, 31),
        yearLabel: 2021,
        monthLabel: 'Jan',
        dayLabel: '31',
        isLastDayOfMonth: true,
        isWeekend: true,
      }),
    );
  });

  it('returns all attributes for a day that is highlighted', () => {
    expect(
      helpers.getDayAttributes(
        new Date(2021, 1, 1), // startDate
        1, // numberOfWeek
        1, // numberOfDay
        [{ key: 'test', start: new Date(2021, 1, 6), end: new Date(2021, 1, 12) }], // highlighted
        HIGHLIGHTED_COLOR_ALPHA, // highlightedColorAlpha
        THEME, // theme
        LOCALE, // locale
      ),
    ).toEqual(
      mockDayAttributes({
        key: '1-1',
        date: new Date(2021, 1, 9),
        yearLabel: 2021,
        monthLabel: 'Feb',
        dayLabel: '09',
        isMonthEven: true,
        isHighlighted: true,
        highlightColor: 'rgba(57, 59, 68, 0.2)',
        highlightId: 'test',
      }),
    );
  });

  it('returns all attributes for a day that is highlighted with custom color', () => {
    expect(
      helpers.getDayAttributes(
        new Date(2021, 1, 1), // startDate
        1, // numberOfWeek
        1, // numberOfDay
        [{ key: 'test', start: new Date(2021, 1, 6), end: new Date(2021, 1, 12), color: '#ff0000' }], // highlighted
        HIGHLIGHTED_COLOR_ALPHA, // highlightedColorAlpha
        THEME, // theme
        LOCALE, // locale
      ),
    ).toEqual(
      mockDayAttributes({
        key: '1-1',
        date: new Date(2021, 1, 9),
        yearLabel: 2021,
        monthLabel: 'Feb',
        dayLabel: '09',
        isMonthEven: true,
        isHighlighted: true,
        highlightColor: 'rgba(255, 0, 0, 0.2)',
        highlightId: 'test',
      }),
    );
  });
});

describe('getCalendarBaseAttributes', () => {
  it('returns undefined values because of missing start date', () => {
    expect(helpers.getCalendarBaseAttributes(undefined, new Date(2021, 11, 11))).toEqual([undefined, undefined, 0]);
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
  it('returns formatted day labels array when week starts on Sunday', () => {
    expect(helpers.getHeaderWeekdays()).toEqual([
      { key: 0, label: 'Sun' },
      { key: 1, label: 'Mon' },
      { key: 2, label: 'Tue' },
      { key: 3, label: 'Wed' },
      { key: 4, label: 'Thu' },
      { key: 5, label: 'Fri' },
      { key: 6, label: 'Sat' },
    ]);
  });

  it('returns formatted day labels array when week starts on Monday', () => {
    expect(helpers.getHeaderWeekdays(1)).toEqual([
      { key: 0, label: 'Mon' },
      { key: 1, label: 'Tue' },
      { key: 2, label: 'Wed' },
      { key: 3, label: 'Thu' },
      { key: 4, label: 'Fri' },
      { key: 5, label: 'Sat' },
      { key: 6, label: 'Sun' },
    ]);
  });
});

describe('getWeeksHeight', () => {
  it('returns the height untouched because the header is not visible', () => {
    expect(
      helpers.getWeeksHeight(
        false, // header
        true, // weekdays
        500, // height
      ),
    ).toEqual(500);
  });

  it('returns the height untouched because the weekdays is not visible but the header is', () => {
    expect(
      helpers.getWeeksHeight(
        true, // header
        false, // weekdays
        500, // height
      ),
    ).toEqual(500);
  });

  it('returns the reduced height number because the header and weekdays are visible', () => {
    expect(
      helpers.getWeeksHeight(
        true, // header
        true, // weekdays
        500, // height
      ),
    ).toEqual(460); // because the weekdays height is 40
  });

  it('returns the reduced height string as css calc function because the header and weekdays are visible and the height is string', () => {
    expect(
      helpers.getWeeksHeight(
        true, // header
        true, // weekdays
        '100%', // height
      ),
    ).toEqual('calc(100% - 40px)'); // because the weekdays height is 40
  });
});
