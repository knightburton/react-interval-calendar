import React, { useMemo } from 'react';

import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';

import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';

import Context from '../../context';
import {
  generateCalendarBaseAttributes,
  getWeeksHeight,
} from '../../helpers';

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

  const weeksHeight = useMemo<WeeksHeight>(
    () => getWeeksHeight(showHeader, showWeekdays, height),
    [showHeader, showWeekdays, height],
  );

  const contextValue = useMemo<ContextType>(() => ({
    startDate,
    numberOfWeeks,
    showWeekdays,
    weekStartsOn,
    fadeWeekends,
    weeksHeight,
  }), [startDate, numberOfWeeks, showWeekdays, weekStartsOn, fadeWeekends, weeksHeight]);

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
