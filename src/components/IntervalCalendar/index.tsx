import React, { useMemo } from 'react';

import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';

import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';

import Context from '../../context';
import { generateCalendarBaseAttributes } from '../../helpers';

const IntervalCalendar = ({
  start,
  end,
  showHeader = true,
  showWeekdays = true,
  weekStartsOn = 0,
  fadeWeekends = false,
  height = 500,
}: IntervalCalendarProps) => {
  // use memo hooks
  const [startDate, , numberOfWeeks] = useMemo<CalendarTuple>(
    () => generateCalendarBaseAttributes(start, end, weekStartsOn),
    [start, end, weekStartsOn],
  );

  const weeksheight = useMemo(
    () => showHeader && showWeekdays && typeof height === 'number'
      ? height - 5 * 8
      : height,
    [showHeader, showWeekdays, height],
  );

  const contextValue = useMemo<ContextType>(() => ({
    startDate,
    numberOfWeeks,
    showWeekdays,
    weekStartsOn,
    fadeWeekends,
    weeksheight,
  }), [startDate, numberOfWeeks, showWeekdays, weekStartsOn, fadeWeekends, weeksheight]);

  return (
    <Context.Provider value={contextValue}>
      <div>
        {showHeader && <IntervalCalendarHeader />}
        <IntervalCalendarWeeks />
      </div>
    </Context.Provider>
  );
};

export default IntervalCalendar;
