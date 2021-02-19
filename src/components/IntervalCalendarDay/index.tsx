import React, { useMemo, useContext } from 'react';

import Context from '../../context';

import classnames from '../../utils/classnames';

import styles from './styles.less';

interface Day {
  key: string,
  date: Date,
  display: string,
  isMonthEven: boolean,
  isFirstDayOfMonth: boolean,
  isLastDayOfMonth: boolean,
  isToday: boolean,
  isWeekend: boolean,
}

interface IntervalCalendarDayProps {
  day: Day,
}

const IntervalCalendarDay = ({ day }: IntervalCalendarDayProps) => {
  // prop destruction
  const { display, isMonthEven, isFirstDayOfMonth, isLastDayOfMonth, isToday, isWeekend } = day;

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
      {display}
    </li>
  );
};

export default IntervalCalendarDay;
