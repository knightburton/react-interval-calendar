import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from '../testUtils';
import Context from '../../context';
import IntervalCalendarWeeks from '../../components/IntervalCalendarWeeks';
import DEFAULT_CONTEXT from '../../constants/default-context';

describe('IntervalCalendarWeeks', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('shows empty weeks container', () => {
    const { asFragment } = render(<IntervalCalendarWeeks />);
    mockAllIsIntersecting(false);
    const fragmentElement = asFragment().firstChild;

    expect(fragmentElement).toHaveClass('weeks');
    expect(fragmentElement).toHaveStyle({ height: '500px' });
  });

  test('shows eight weeks container based on updated context', () => {
    const { asFragment } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          startDate: new Date(1616781552075),
          numberOfWeeks: 7,
          customClassNames: {
            weeks: 'test-weeks-classname',
          },
          weeksHeight: '700px',
        }}
      >
        <IntervalCalendarWeeks />
      </Context.Provider>,
    );
    mockAllIsIntersecting(true);
    const fragmentElement = asFragment().firstChild;
    const lists = screen.getAllByRole('list');

    expect(fragmentElement).toHaveClass('weeks test-weeks-classname');
    expect(fragmentElement).toHaveStyle({ height: '700px' });
    expect(lists.length).toEqual(8);
  });
});
