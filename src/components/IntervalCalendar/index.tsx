import React, { useMemo } from 'react';

import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';

import { IntervalCalendarProps } from '../../interfaces/IntervalCalendar.interface';

import Context from '../../context';
import {
  getCalendarBaseAttributes,
  getWeeksHeight,
} from '../../helpers';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendar = ({
  start,
  end,
  showHeader = true,
  showWeekdays = true,
  showMonths = false,
  showBorder = false,
  showBorderRadius = false,
  weekStartsOn = 0,
  fadeWeekends = false,
  height = 500,
  highlighted = [],
}: IntervalCalendarProps) => {
  // use memo hooks
  const [startDate, , numberOfWeeks] = useMemo<CalendarTuple>(
    () => getCalendarBaseAttributes(start, end, weekStartsOn),
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
    showMonths,
    weekStartsOn,
    fadeWeekends,
    weeksHeight,
    highlighted,
  }), [startDate, numberOfWeeks, showWeekdays, showMonths, weekStartsOn, fadeWeekends, weeksHeight, highlighted]);

  const classNames = useMemo<string>(
    () => classnames({
      [styles.calendar__border]: showBorder,
      [styles.calendar__border__radius]: showBorder && showBorderRadius,
    }),
    [showBorder, showBorderRadius],
  );

  return (
    <Context.Provider value={contextValue}>
      <div className={classNames}>
        {showHeader && <IntervalCalendarHeader />}
        <IntervalCalendarWeeks />
      </div>
    </Context.Provider>
  );
};

export default IntervalCalendar;
