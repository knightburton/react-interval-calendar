import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockDayAttributes } from '../test-utils';
import Context from '../../context';
import IntervalCalendarDay from '../../components/IntervalCalendarDay';
import DEFAULT_CONTEXT from '../../constants/default-context';

describe('IntervalCalendarDay', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('shows a day with default context and prop values', () => {
    render(<IntervalCalendarDay day={mockDayAttributes()} />);
    const day = screen.getByRole('presentation');
    const label = screen.getByText(/18/i);

    expect(day).toHaveClass('day');
    expect(label).toBeVisible();
  });

  test('shows a day with first day of month context and prop values', () => {
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          showYears: true,
          showMonths: true,
          customClassNames: {
            day: 'test-day-classname',
            dayText: 'test-day-text-classname',
            dayYearText: 'test-day-year-classname',
            dayMonthText: 'test-day-month-classname',
            dayHighlighted: 'test-day-highlighted-classname',
          },
        }}
      >
        <IntervalCalendarDay
          day={mockDayAttributes({
            key: '2-0',
            date: new Date(2021, 1, 1),
            yearLabel: 2021,
            monthLabel: 'Mar',
            dayLabel: '01',
            isMonthEven: true,
            isFirstDayOfMonth: true,
            isHighlighted: true,
            isFirstOfHighlighted: true,
            isLastOfHighlighted: true,
            highlightColor: 'rgba(255, 0, 0, 0.2)',
            highlightId: 'mock',
          })}
        />
      </Context.Provider>,
    );
    const day = screen.getByRole('presentation');
    const label = screen.getByText(/01/i);
    const year = screen.getByText(/2021/i);
    const month = screen.getByText(/Mar/i);

    expect(day).toHaveClass('day test-day-classname');
    expect(label).toBeVisible();
    expect(label).toHaveClass('test-day-text-classname');
    expect(day.firstChild).toHaveClass('day__highlighted day__highlighted__first day__highlighted__last test-day-highlighted-classname');
    expect(day.firstChild).toHaveStyle({ backgroundColor: 'rgba(255, 0, 0, 0.2)' });
    expect(year).toBeVisible();
    expect(year).toHaveClass('test-day-year-classname');
    expect(month).toBeVisible();
    expect(month).toHaveClass('test-day-month-classname');
  });

  test('shows a day with last day of month context and prop values', () => {
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          showToday: true,
          showYears: true,
          showMonths: true,
          showMonthStripes: true,
          fadeWeekends: true,
        }}
      >
        <IntervalCalendarDay
          day={mockDayAttributes({
            key: '2-7',
            date: new Date(2021, 1, 28),
            yearLabel: 2021,
            monthLabel: 'Mar',
            dayLabel: '28',
            isMonthEven: true,
            isLastDayOfMonth: true,
            isHighlighted: true,
            highlightColor: 'rgba(255, 0, 0, 0.2)',
            highlightId: 'mock',
            isWeekend: true,
            isToday: true,
          })}
        />
      </Context.Provider>,
    );
    const day = screen.getByRole('presentation');
    const label = screen.getByText(/28/i);
    const year = screen.queryByText(/2021/i);
    const month = screen.queryByText(/Mar/i);

    expect(day).toHaveClass('day day__today day__weekend');
    expect(label).toBeVisible();
    expect(day.firstChild).toHaveClass('day__highlighted');
    expect(day.firstChild).toHaveStyle({ backgroundColor: 'rgba(255, 0, 0, 0.2)' });
    expect(year).toBeFalsy();
    expect(month).toBeFalsy();
  });

  test('shows a day with select enabled and fire click event', () => {
    const mockDay = mockDayAttributes();
    const mockHandleSelect = jest.fn(() => {});
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          enableSelect: true,
          handleSelect: mockHandleSelect,
        }}
      >
        <IntervalCalendarDay day={mockDay} />
      </Context.Provider>,
    );
    const day = screen.getByRole('presentation');

    expect(day).toHaveClass('day day__selectable');
    expect(day).not.toHaveClass('day__selected');

    fireEvent.click(day);
    expect(day).toHaveClass('day__selected');
    expect(mockHandleSelect).toHaveBeenCalledWith(mockDay, expect.any(Function));

    // Second click should not take effect.
    fireEvent.click(day);
    expect(day).toHaveClass('day__selected');
    expect(mockHandleSelect).toHaveBeenCalledTimes(1);
  });

  test('shows a day with select enabled and fire click event without handleSelect', () => {
    const mockDay = mockDayAttributes();
    render(
      <Context.Provider
        value={{
          ...DEFAULT_CONTEXT,
          enableSelect: true,
        }}
      >
        <IntervalCalendarDay day={mockDay} />
      </Context.Provider>,
    );
    const day = screen.getByRole('presentation');

    expect(day).toHaveClass('day day__selectable');
    expect(day).not.toHaveClass('day__selected');

    fireEvent.click(day);
    expect(day).toHaveClass('day__selected');
  });
});
