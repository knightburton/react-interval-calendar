import React from 'react';
import PropTypes from 'prop-types';

import {
  WEEKDAY_KEYS,
  WEEKDAYS,
} from '../../constants';

import styles from './styles.less';

const IntervalCalendarHeader = ({ weekStartsOn }) => (
  <div className={styles.header}>
    {[...WEEKDAYS.slice(weekStartsOn, 7), ...WEEKDAYS.slice(0, weekStartsOn)].map(day => (
      <div key={day.key} className={styles.header__day}>
        {day.short}
      </div>
    ))}
  </div>
);

IntervalCalendarHeader.propTypes = {
  weekStartsOn: PropTypes.oneOf(WEEKDAY_KEYS),
};

IntervalCalendarHeader.defaultProps = {
  weekStartsOn: 0,
};

export default IntervalCalendarHeader;
