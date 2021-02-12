import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import IntervalCalendarHeader from '../IntervalCalendarHeader';

import Context from '../../context';
import { WEEKDAY_KEYS } from '../../constants';

const IntervalCalendar = ({ showHeader, showWeekdays, weekStartsOn }) => {
  // use memo hooks
  const contextValue = useMemo(() => ({
    showWeekdays,
    weekStartsOn,
  }), [showWeekdays, weekStartsOn]);

  return (
    <Context.Provider value={contextValue}>
      <div>
        {showHeader && <IntervalCalendarHeader />}
        <p>Calendar</p>
      </div>
    </Context.Provider>
  );
};

IntervalCalendar.propTypes = {
  showHeader: PropTypes.bool,
  showWeekdays: PropTypes.bool,
  weekStartsOn: PropTypes.oneOf(WEEKDAY_KEYS),
};

IntervalCalendar.defaultProps = {
  showHeader: true,
  showWeekdays: true,
  weekStartsOn: 0,
};

export default IntervalCalendar;
