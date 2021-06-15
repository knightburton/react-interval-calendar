import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Context from '../../src/context';
import IntervalCalendarHeader from '../../src/components/IntervalCalendarHeader';
import DEFAULT_CONTEXT from '../../src/constants/default-context';

describe('IntervalCalendarEmpty', () => {
  test('shows a header with weekdays start on Sunday (default context)', () => {
    const { asFragment } = render(<IntervalCalendarHeader />);
    const fragmentElement = asFragment().firstChild;
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

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
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          weekStartsOn: 1,
        }}
      >
        <IntervalCalendarHeader />
      </Context.Provider>,
    );
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

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
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          showHeaderWeekdays: false,
        }}
      >
        <IntervalCalendarHeader />
      </Context.Provider>,
    );
    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    expect(list).toEqual(null);
    expect(listItems.length).toEqual(0);
  });

  test('shows a header with weekdays list and custom classnames', () => {
    const { asFragment } = render(
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
    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    expect(fragmentElement).toHaveClass('header test=header-classname');
    expect(list).toBeVisible();
    expect(list).toHaveClass('header__weekdays test-header-weekdays-classname');
    expect(listItems.length).toEqual(7);
    listItems.forEach(listItem => {
      expect(listItem).toHaveClass('header__weekday test-header-weekday-classname');
    });
  });
});
