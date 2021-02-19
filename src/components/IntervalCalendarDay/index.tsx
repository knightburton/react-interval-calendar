import React, { useMemo, useContext } from 'react';

import { IntervalCalendarDayProps } from '../../interfaces/IntervalCalendarDay.interface';
import Context from '../../context';
import classnames from '../../utils/classnames';
import styles from './styles.less';

const IntervalCalendarDay = ({ day }: IntervalCalendarDayProps) => {
  // prop destruction
  const { yearLabel, monthLabel, dayLabel, isMonthEven, isFirstDayOfMonth, isLastDayOfMonth, isToday, isWeekend } = day;

  // useContext hooks
  const { fadeWeekends } = useContext(Context);

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
        [styles.day__today]: isToday,
        [styles.day__weekend]: isWeekend && fadeWeekends,
      },
    ),
    [isMonthEven, isFirstDayOfMonth, isLastDayOfMonth, isToday, isWeekend, fadeWeekends],
  );

  return (
    <li className={className}>
      {isFirstDayOfMonth && (
        <span className={styles.day__detail}>
          {monthLabel}
        </span>
      )}
      {dayLabel}
      {isFirstDayOfMonth && (
        <span className={styles.day__detail}>
          {yearLabel}
        </span>
      )}
    </li>
  );
};

export default IntervalCalendarDay;
