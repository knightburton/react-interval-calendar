import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import IntervalCalendarHeader from '../IntervalCalendarHeader';

import Context from '../../context';
import { WEEKDAYS } from '../../constants';

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
  weekStartsOn: PropTypes.oneOf(WEEKDAYS),
};

IntervalCalendar.defaultProps = {
  weekStartsOn: 0,
};

export default IntervalCalendar;
