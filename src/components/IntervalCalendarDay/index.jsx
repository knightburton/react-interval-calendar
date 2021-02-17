import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import classnames from '../../utils/classnames';

import styles from './styles.less';

const IntervalCalendarDay = ({ day }) => {
  // prop destruction
  const { display, isMonthEven, isFirstDayOfMonth, isLastDayOfMonth } = day;

  // useMemo hooks
  const className = useMemo(
    () => classnames(
      styles.day,
      {
        [styles.day__month__even]: isMonthEven,
        [styles.day__first__of__month]: isFirstDayOfMonth,
        [styles.day__first__of__month__even]: isFirstDayOfMonth && isMonthEven,
        [styles.day__last__of__month]: isLastDayOfMonth,
        [styles.day__last__of__month__even]: isLastDayOfMonth && isMonthEven,
      },
    ),
    [isMonthEven, isFirstDayOfMonth, isLastDayOfMonth],
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
    isMonthEven: PropTypes.bool,
    isFirstDayOfMonth: PropTypes.bool,
    isLastDayOfMonth: PropTypes.bool,
  }),
};

IntervalCalendarDay.defaultProps = {
  day: {},
};

export default IntervalCalendarDay;
