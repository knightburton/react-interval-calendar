import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockIntersectionInstance, mockAllIsIntersecting } from '../testUtils';
import Context from '../../src/context';
import IntervalCalendarWeek from '../../src/components/IntervalCalendarWeek';
import DEFAULT_CONTEXT from '../../src/constants/default-context';

describe('IntervalCalendarWeek', () => {
  test('shows empty list as week', () => {
    const { unmount } = render(<IntervalCalendarWeek numberOfWeek={0} />);
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    expect(observer?.observe).toHaveBeenCalled();
    expect(list).toHaveClass('week');
    expect(listItems.length).toEqual(0);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows empty list as week based on missing start date', () => {
    const { unmount } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          numberOfWeeks: 1,
          visibilityMatrix: { 0: true, 1: true, 2: false, 3: false },
        }}
      >
        <IntervalCalendarWeek numberOfWeek={0} />
      </Context.Provider>,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    expect(observer?.observe).toHaveBeenCalled();
    expect(list).toHaveClass('week');
    expect(listItems.length).toEqual(0);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows empty week list, trigger the visibility matrix update', () => {
    const updateVisibilityMatrix = jest.fn(() => {});
    const { unmount } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          startDate: new Date(1616781552075),
          numberOfWeeks: 1,
          visibilityMatrix: {},
          updateVisibilityMatrix,
          numberOfWeekPreRender: 0,
        }}
      >
        <IntervalCalendarWeek numberOfWeek={1} />
      </Context.Provider>,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    mockAllIsIntersecting(true);

    expect(observer?.observe).toHaveBeenCalled();
    expect(list).toHaveClass('week');
    expect(listItems.length).toEqual(0);
    expect(updateVisibilityMatrix).toHaveBeenCalledWith(1);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows one week list items based on the visibility matrix', () => {
    const { unmount } = render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          startDate: new Date(1616781552075),
          numberOfWeeks: 3,
          visibilityMatrix: { 0: true, 1: true, 2: true, 3: true, 4: false },
          numberOfWeekPreRender: 1,
        }}
      >
        <IntervalCalendarWeek numberOfWeek={0} />
      </Context.Provider>,
    );
    const list = screen.getByRole('list');
    const listItems = screen.queryAllByRole('presentation');
    const observer = mockIntersectionInstance(list);

    expect(observer?.observe).toHaveBeenCalled();
    expect(list).toHaveClass('week');
    expect(listItems.length).toEqual(7);

    unmount();

    expect(observer?.disconnect).toHaveBeenCalled();
  });

  test('shows week container with custom classname', () => {
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          startDate: new Date(1616781552075),
          numberOfWeeks: 1,
          visibilityMatrix: { 0: false, 1: false, 2: false, 3: false, 4: false },
          customClassNames: {
            week: 'test-week-classname',
          },
        }}
      >
        <IntervalCalendarWeek numberOfWeek={0} />
      </Context.Provider>,
    );
    const list = screen.getByRole('list');

    expect(list).toHaveClass('week test-week-classname');
  });
});
