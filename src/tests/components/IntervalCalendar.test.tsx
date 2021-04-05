import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { mockAllIsIntersecting } from '../test-utils';
import IntervalCalendar from '../../components/IntervalCalendar';

const mockStart = new Date(2020, 9, 1, 0, 0, 0, 0);
const mockEnd = new Date(2020, 10, 15, 0, 0, 0, 0);
const eleventh = 10;
const eleventhDay = {
  date: new Date(2020, 9, 8, 0, 0, 0, 0),
  dayLabel: '08',
  highlightColor: undefined,
  highlightId: undefined,
  isFirstDayOfMonth: false,
  isFirstOfHighlighted: false,
  isHighlighted: false,
  isLastDayOfMonth: false,
  isLastOfHighlighted: false,
  isMonthEven: true,
  isToday: false,
  isWeekend: false,
  key: '1-3',
  monthLabel: 'Oct',
  yearLabel: 2020,
};

describe('IntervalCalendar', () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('shows empty calendar with header based on default props', () => {
    const { container } = render(<IntervalCalendar />);
    const calendar = container.firstChild;
    const lists = screen.queryAllByRole('list');
    const headerItems = screen.queryAllByRole('listitem');
    const emptyText = screen.getByText(/no date range/i);

    expect(calendar).toHaveClass('calendar');
    expect(calendar).toHaveAttribute('data-theme');
    expect(calendar).toHaveStyle({ height: '500px' });
    expect(lists.length).toEqual(1); // Only the header should be visible here.
    expect(headerItems.length).toEqual(7);
    expect(emptyText).toHaveTextContent('There is no date range to display');
  });

  test('shows a valid interval based on the start and end prop (10 week)', () => {
    // Based on that we shows full months with full weeks the amount of week that we should see is 10.
    render(<IntervalCalendar start={mockStart} end={mockEnd} />);
    const lists = screen.queryAllByRole('list');
    const headerItems = screen.queryAllByRole('listitem');
    const weekItems = screen.queryAllByRole('presentation');

    mockAllIsIntersecting(true);

    expect(lists.length).toEqual(11); // 10 weeks + 1 header
    expect(headerItems.length).toEqual(7);
    expect(weekItems.length).toEqual(70);
  });

  test('shows a valid interval based on massive prop changes', () => {
    const mockOnSelect = jest.fn(() => {});
    render(
      <IntervalCalendar
        start={mockStart}
        end={mockEnd}
        customClassNames={{
          calendar: 'test-calendar-classname',
        }}
        enableSelect
        emptyLabel="Hey!!!"
        fadeWeekends
        height={555}
        highlighted={[{ key: 'mock', start: mockStart, end: new Date(2020, 9, 5, 0, 0, 0, 0) }]}
        highlightedColorAlpha={0.4}
        locale="default"
        numberOfWeekFirstRender={4}
        numberOfWeekPreRender={0}
        onSelect={mockOnSelect}
        showBorder
        showBorderRadius
        showGutterBetweenHighlighted
        showHeader
        showHeaderWeekdays
        showMonthStripes
        showMonths
        showToday
        showYears
        theme="dark"
        weekStartsOn={1}
      />,
    );
    const lists = screen.queryAllByRole('list');
    const headerItems = screen.queryAllByRole('listitem');
    const weekItems = screen.queryAllByRole('presentation');

    expect(lists.length).toEqual(11); // 10 weeks + 1 header
    expect(headerItems.length).toEqual(7);
    expect(weekItems.length).toEqual(28); // 4 week to render first and 0 to pre render.

    mockAllIsIntersecting(true);

    const weekItemsAfter = screen.queryAllByRole('presentation');
    expect(weekItemsAfter.length).toEqual(70); // all week intersected.

    const clickItem = weekItemsAfter[eleventh];
    expect(clickItem).toHaveClass('day day__month__even'); // There is no selected class before click.

    fireEvent.click(clickItem);

    expect(mockOnSelect).toHaveBeenCalledWith(eleventhDay);
    expect(clickItem).toHaveClass('day__selected');
  });

  test('handles click without onSelect prop', () => {
    render(<IntervalCalendar start={mockStart} end={mockEnd} enableSelect weekStartsOn={1} />);
    mockAllIsIntersecting(true);

    const weekItemsAfter = screen.queryAllByRole('presentation');
    expect(weekItemsAfter.length).toEqual(70);

    const firstCLickItem = weekItemsAfter[eleventh];
    expect(firstCLickItem).toHaveClass('day day__month__even');
    fireEvent.click(firstCLickItem);
    expect(firstCLickItem).toHaveClass('day__selected');

    const secondCLickItem = weekItemsAfter[eleventh + 1];
    expect(firstCLickItem).toHaveClass('day day__month__even');
    fireEvent.click(secondCLickItem);
    expect(secondCLickItem).toHaveClass('day__selected');
  });
});
