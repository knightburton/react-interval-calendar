import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Context from '../../context';
import IntervalCalendarEmpty from '../../components/IntervalCalendarEmpty';
import DEFAULT_CONTEXT from '../../constants/default-context';

describe('IntervalCalendarHeader', () => {
  afterEach(cleanup);

  test('shows the default empty label', () => {
    const { asFragment, getByText } = render(<IntervalCalendarEmpty />);
    const fragmentElement = asFragment().firstChild;
    const text = getByText('There is no date range to display');

    expect(fragmentElement).toHaveClass('empty');
    expect(fragmentElement).toHaveStyle({ height: '500px' });
    expect(text).toBeTruthy();
  });

  test('shows the custom empty label', () => {
    const { getByText } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          emptyLabel: 'Hey! Get over here!',
        }}
      >
        <IntervalCalendarEmpty />
      </Context.Provider>,
    );
    const text = getByText('Hey! Get over here!');

    expect(text).toBeTruthy();
  });

  test('shows the default empty label with custom classname and height', () => {
    const { asFragment } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          weeksHeight: '700px',
          customClassNames: {
            calendarEmpty: 'test-empty-classname',
          },
        }}
      >
        <IntervalCalendarEmpty />
      </Context.Provider>,
    );
    const fragmentElement = asFragment().firstChild;

    expect(fragmentElement).toHaveClass('empty test-empty-classname');
    expect(fragmentElement).toHaveStyle({ height: '700px' });
  });
});
