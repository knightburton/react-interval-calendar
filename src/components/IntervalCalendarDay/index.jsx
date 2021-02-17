import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.less';

const IntervalCalendarDay = ({ day }) => {
  // prop destruction
  const { display } = day;

  return (
    <li className={styles.day}>
      {display}
    </li>
  );
};

IntervalCalendarDay.propTypes = {
  day: PropTypes.shape({
    key: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    display: PropTypes.string,
  }),
};

IntervalCalendarDay.defaultProps = {
  day: {},
};

export default IntervalCalendarDay;
