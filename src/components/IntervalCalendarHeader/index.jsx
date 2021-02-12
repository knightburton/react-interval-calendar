import React from 'react';
import PropTypes from 'prop-types';

import { WEEKDAYS } from '../../constants';

import styles from './styles.less';

const IntervalCalendarHeader = ({ weekStartsOn }) => (
  <div className={styles.header}>
    {[...WEEKDAYS.slice(weekStartsOn, 7), ...WEEKDAYS.slice(0, weekStartsOn)].map(day => (
      <div key={day} className={styles.header__day}>
        {day}
      </div>
    ))}
  </div>
);

IntervalCalendarHeader.propTypes = {
  weekStartsOn: PropTypes.oneOf(WEEKDAYS),
};

IntervalCalendarHeader.defaultProps = {
  weekStartsOn: 0,
};

export default IntervalCalendarHeader;
