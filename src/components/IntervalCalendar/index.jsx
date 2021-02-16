import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import IntervalCalendarHeader from '../IntervalCalendarHeader';
import IntervalCalendarWeeks from '../IntervalCalendarWeeks';

import Context from '../../context';
import {
  getMonthStart,
  getMonthEnd,
  getWeekStart,
  getWeekEnd,
  getDifferenceInCalendarWeeks,
} from '../../utils/date';
import { WEEKDAY_KEYS } from '../../constants';

const IntervalCalendar = ({
  start,
  end,
  showHeader,
  showWeekdays,
  weekStartsOn,
}) => {
  // use memo hooks
  const [, , numberOfWeeks] = useMemo(() => {
    if (start && end && weekStartsOn) {
      const monthStart = getMonthStart(start);
      const monthEnd = getMonthEnd(end);
      const alfa = getWeekStart(monthStart, weekStartsOn);
      const omega = getWeekEnd(monthEnd, weekStartsOn);
      const weeks = getDifferenceInCalendarWeeks(omega, alfa, weekStartsOn);

      return [alfa, omega, weeks];
    }
    return [null, null, null];
  }, [start, end, weekStartsOn]);

  const contextValue = useMemo(() => ({
    numberOfWeeks,
    showWeekdays,
    weekStartsOn,
  }), [numberOfWeeks, showWeekdays, weekStartsOn]);

  return (
    <Context.Provider value={contextValue}>
      <div>
        {showHeader && <IntervalCalendarHeader />}
        <IntervalCalendarWeeks />
      </div>
    </Context.Provider>
  );
};

IntervalCalendar.propTypes = {
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  showHeader: PropTypes.bool,
  showWeekdays: PropTypes.bool,
  weekStartsOn: PropTypes.oneOf(WEEKDAY_KEYS),
};

IntervalCalendar.defaultProps = {
  start: null,
  end: null,
  showHeader: true,
  showWeekdays: true,
  weekStartsOn: 0,
};

export default IntervalCalendar;
