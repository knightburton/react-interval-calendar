import React, { useMemo, useContext } from 'react';

import { IntervalCalendarDayProps } from '../../interfaces/IntervalCalendarDay.interface';
import Context from '../../context';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendarDay = ({ day }: IntervalCalendarDayProps) => {
  // useContext hooks
  const { fadeWeekends } = useContext(Context);

  // useMemo hooks
  const className = useMemo(
    () => classnames(
      styles.day,
      {
        [styles.day__month__even]: day?.isMonthEven,
        [styles.day__first__of__month]: day?.isFirstDayOfMonth,
        [styles.day__first__of__month__even]: day?.isFirstDayOfMonth && day?.isMonthEven,
        [styles.day__last__of__month]: day?.isLastDayOfMonth,
        [styles.day__last__of__month__even]: day?.isLastDayOfMonth && day?.isMonthEven,
        [styles.day__today]: day?.isToday,
        [styles.day__weekend]: day?.isWeekend && fadeWeekends,
      },
    ),
    [day],
  );

  return (
    <li className={className}>
      {day?.isFirstDayOfMonth && (
        <span className={styles.day__detail}>
          {day.monthLabel}
        </span>
      )}
      {day.dayLabel}
      {day?.isFirstDayOfMonth && (
        <span className={styles.day__detail}>
          {day.yearLabel}
        </span>
      )}
    </li>
  );
};

export default IntervalCalendarDay;
