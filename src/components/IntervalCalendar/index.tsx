import React, { useMemo } from 'react';

import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';

import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';

import Context from '../../context';
import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  getDifferenceInCalendarWeeks,
} from '../../utils/date';

const IntervalCalendar = ({
  start = null,
  end = null,
  showHeader = true,
  showWeekdays = true,
  weekStartsOn = 0,
  fadeWeekends = false,
}: IntervalCalendarProps) => {
  // use memo hooks
  const [startDate, , numberOfWeeks] = useMemo(() => {
    if (start && end && weekStartsOn) {
      const monthStart = getMonthStart(start);
      const monthEnd = getMonthEnd(end);
      const alfa = getWeekStart(monthStart, weekStartsOn);
      const omega = getWeekEnd(monthEnd, weekStartsOn);
      const weeks = getDifferenceInCalendarWeeks(omega, alfa, weekStartsOn);

      return [alfa, omega, weeks];
    }
    return [null, null, 0];
  }, [start, end, weekStartsOn]);

  const contextValue = useMemo<ContextType>(() => ({
    startDate,
    numberOfWeeks,
    showWeekdays,
    weekStartsOn,
    fadeWeekends,
  }), [startDate, numberOfWeeks, showWeekdays, weekStartsOn, fadeWeekends]);

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
