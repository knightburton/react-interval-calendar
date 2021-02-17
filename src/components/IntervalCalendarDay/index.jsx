import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import classnames from '../../utils/classnames';

import styles from './styles.less';

const IntervalCalendarDay = ({ day }) => {
  // prop destruction
  const { display, monthEven } = day;

  // useMemo hooks
  const className = useMemo(
    () => classnames(
      styles.day,
      {
        [styles.day__month__even]: monthEven,
      },
    ),
    [monthEven],
  );

  return (
    <li className={className}>
      {display}
    </li>
  );
};

IntervalCalendarDay.propTypes = {
  day: PropTypes.shape({
    key: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    display: PropTypes.string,
    monthEven: PropTypes.bool,
  }),
};

IntervalCalendarDay.defaultProps = {
  day: {},
};

export default IntervalCalendarDay;
