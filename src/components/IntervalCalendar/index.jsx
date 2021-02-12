import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import IntervalCalendarHeader from '../IntervalCalendarHeader';

import Context from '../../context';
import { WEEKDAY_KEYS } from '../../constants';

const IntervalCalendar = ({ weekStartsOn }) => {
  // use memo hooks
  const contextValue = useMemo(() => ({
    weekStartsOn,
  }), [weekStartsOn]);

  return (
    <Context.Provider value={contextValue}>
      <div>
        <IntervalCalendarHeader
          weekStartsOn={weekStartsOn}
        />
        <p>Calendar</p>
      </div>
    </Context.Provider>
  );
};

IntervalCalendar.propTypes = {
  weekStartsOn: PropTypes.oneOf(WEEKDAY_KEYS),
};

IntervalCalendar.defaultProps = {
  weekStartsOn: 0,
};

export default IntervalCalendar;
