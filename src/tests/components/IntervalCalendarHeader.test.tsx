import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Context from '../../context';
import IntervalCalendarHeader from '../../components/IntervalCalendarHeader';
import DEFAULT_CONTEXT from '../../constants/default-context';

describe('IntervalCalendarHeader', () => {
  afterEach(cleanup);

  test('shows a header with weekdays start on Sunday (default context)', () => {
    const { getByRole, getAllByRole, asFragment } = render(<IntervalCalendarHeader />);
    const fragmentElement = asFragment().firstChild;
    const list = getByRole('list');
    const listItems = getAllByRole('listitem');

    expect(fragmentElement).toHaveClass('header');
    expect(list).toBeVisible();
    expect(list).toHaveClass('header__weekdays');
    expect(listItems.length).toEqual(7);
    expect(listItems[0]).toHaveTextContent('Sun');
    listItems.forEach(listItem => {
      expect(listItem).toHaveClass('header__weekday');
    });
  });

  test('shows a header with weekdays start on Monday', () => {
    const { getByRole, getAllByRole } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          weekStartsOn: 1,
        }}
      >
        <IntervalCalendarHeader />
      </Context.Provider>,
    );
    const list = getByRole('list');
    const listItems = getAllByRole('listitem');

    expect(list).toBeVisible();
    expect(list).toHaveClass('header__weekdays');
    expect(listItems.length).toEqual(7);
    expect(listItems[0]).toHaveTextContent('Mon');
    expect(listItems[6]).toHaveTextContent('Sun');
    listItems.forEach(listItem => {
      expect(listItem).toHaveClass('header__weekday');
    });
  });

  test('shows a header without weekdays list', () => {
    const { queryByRole, queryAllByRole } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          showHeaderWeekdays: false,
        }}
      >
        <IntervalCalendarHeader />
      </Context.Provider>,
    );
    const list = queryByRole('list');
    const listItems = queryAllByRole('listitem');

    expect(list).toEqual(null);
    expect(listItems.length).toEqual(0);
  });

  test('shows a header with weekdays list and custom classnames', () => {
    const { queryByRole, queryAllByRole, asFragment } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          customClassNames: {
            header: 'test=header-classname',
            headerWeekdays: 'test-header-weekdays-classname',
            headerWeekday: 'test-header-weekday-classname',
          },
        }}
      >
        <IntervalCalendarHeader />
      </Context.Provider>,
    );
    const fragmentElement = asFragment().firstChild;
    const list = queryByRole('list');
    const listItems = queryAllByRole('listitem');

    expect(fragmentElement).toHaveClass('header test=header-classname');
    expect(list).toBeVisible();
    expect(list).toHaveClass('header__weekdays test-header-weekdays-classname');
    expect(listItems.length).toEqual(7);
    listItems.forEach(listItem => {
      expect(listItem).toHaveClass('header__weekday test-header-weekday-classname');
    });
  });
});
